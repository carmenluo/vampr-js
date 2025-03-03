class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {

    if (!this.creator) {
      return 0;
    }
    else {
      return this.creator.numberOfVampiresFromOriginal + 1;
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let result;
    if (this.name === name) {
      return this;
    } else {
      for (let child of this.offspring) {
        console.log(child.name);
        //fix here. because it migth not be the leaf node
        if (child.name === name) {
          console.log(`i print here ${child.name}`)
          return child;
        }
        else if (child.offspring.length === 0) {
          return;
        }

        else {
          result = child.vampireWithName(name);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let result = 0;
    for (let vampire of this.offspring) {
      if (vampire.offspring.length === 0) {
        result = 1;
      }
      else {
        result += vampire.totalDescendents + 1;
      }
    }
    return result;
  }

  Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let result = [];
    if (this.yearConverted > 1980) {
      result.push(this);
    }
    if (!this.offspring) {
      return result;
    }
    for (let vampire of this.offspring) {
      let temp = vampire.allMillennialVampires;
      temp.forEach(element => { result.push(element)        
      });
    }
    return result;
  }

  /** Tree traversal methods **/

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this.isMoreSeniorThan(vampire)) {
      vampire = vampire.creator;
      return this.closestCommonAncestor(vampire);
    }
    else {
      if (this.numberOfVampiresFromOriginal === vampire.numberOfVampiresFromOriginal) {
        if (this.name === vampire.name) {
          return this;
        } else {
          return this.creator.closestCommonAncestor(vampire.creator);
        }
      } else {
        return this.creator.closestCommonAncestor(vampire);
      }
    }
  }
}
let rootVampire;

rootVampire = new Vampire("root");


let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
offspring1 = new Vampire("a", 1000);
offspring2 = new Vampire("b", 900);
offspring3 = new Vampire("c", 1400);
offspring4 = new Vampire("d", 1890);
offspring5 = new Vampire("e", 1990);
offspring6 = new Vampire("f", 2000);
offspring7 = new Vampire("g", 2010);
offspring8 = new Vampire("h", 2017);

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);
console.log(rootVampire.allMillennialVampires);
// console.log(offspring1.totalDescendents);
// console.log(offspring2.totalDescendents)
// console.log(offspring3.totalDescendents)
module.exports = Vampire;

