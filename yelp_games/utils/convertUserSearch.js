const convertUserSearch = (userSearch) => {
    switch (userSearch) {
        case "action":
            return "0";

        case "fighting":
            return "1";

        case "stealth":
            return "2";

        case "survivalhorror":
            return "3";

        case "adventure":
            return "4";

        case "rpg":
            return "5";

        case "battleroyale":
            return "6";

        case "simulation":
            return "7";

        case "racing":
            return "8";
    }
};

module.exports = convertUserSearch;
