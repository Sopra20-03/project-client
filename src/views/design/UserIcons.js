import userfemale from "../../views/logos/user_female.png";
import usermale from "../../views/logos/user_male.png";
import bird from "../../views/logos/001-bird.png";
import dog from "../../views/logos/002-dog.png";
import cat from "../../views/logos/003-cat.png";
import fish from "../../views/logos/004-clown-fish.png";
import iguana from "../../views/logos/005-iguana.png";
import hen from "../../views/logos/006-hen.png";
import owl from "../../views/logos/007-owl.png";
import bee from "../../views/logos/008-bee.png";
import swan from "../../views/logos/009-swan.png";
import butterfly from "../../views/logos/010-butterfly.png";
import robot from "../logos/robot.png";

export function chooseIcon(icon) {
    switch(icon){
        case "female":
            return userfemale;
        case "male":
            return usermale;
        case "bird":
            return bird;
        case "dog":
            return dog;
        case "cat":
            return cat;
        case "fish":
            return fish;
        case "iguana":
            return iguana;
        case "hen":
            return hen;
        case "owl":
            return owl;
        case "bee":
            return bee;
        case "swan":
            return swan;
        case "butterfly":
            return butterfly;
        default:
            return robot;
    }
}

const userIcons = {
    userfemale: {userfemale},
    usermale: {usermale},
    bird: {bird},
    dog: {dog},
    cat: {cat},
    fish: {fish},
    iguana: {iguana},
    hen: {hen},
    owl: {owl},
    bee: {bee},
    swan: {swan},
    butterfly: {butterfly},
};

export default userIcons;