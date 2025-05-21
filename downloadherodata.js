const fs = require('fs');
const path = require('path');

// List of heroes
const heroes = [
    { hero_name: "Adam Warlock", file_image: "adam-warlock_prestige" },
    { hero_name: "Black Panther", file_image: "black-panther_prestige" },
    { hero_name: "Black Widow", file_image: "black-widow_prestige" },
    { hero_name: "Captain America", file_image: "captain-america_prestige" },
    { hero_name: "Cloak & Dagger", file_image: "cloak-and-dagger_prestige" },
    { hero_name: "Doctor Strange", file_image: "doctor-strange_prestige" },
    { hero_name: "Emma Frost", file_image: "emma-frost_prestige" },
    { hero_name: "Groot", file_image: "groot_prestige" },
    { hero_name: "Hawkeye", file_image: "hawkeye_prestige" },
    { hero_name: "Hela", file_image: "hela_prestige" },
    { hero_name: "Hulk", file_image: "hulk_prestige" },
    { hero_name: "Human Torch", file_image: "human-torch_prestige" },
    { hero_name: "Invisible Woman", file_image: "invisible-woman_prestige" },
    { hero_name: "Iron Fist", file_image: "iron-fist_prestige" },
    { hero_name: "Iron Man", file_image: "iron-man_prestige" },
    { hero_name: "Jeff the Land Shark", file_image: "jeff-the-land-shark_prestige" },
    { hero_name: "Loki", file_image: "loki_prestige" },
    { hero_name: "Luna Snow", file_image: "luna-snow_prestige" },
    { hero_name: "Magik", file_image: "magik_prestige" },
    { hero_name: "Magneto", file_image: "magneto_prestige" },
    { hero_name: "Mantis", file_image: "mantis_prestige" },
    { hero_name: "Mister Fantastic", file_image: "mister-fantastic_prestige" },
    { hero_name: "Moon Knight", file_image: "moon-knight_prestige" },
    { hero_name: "Namor", file_image: "namor_prestige" },
    { hero_name: "Peni Parker", file_image: "peni-parker_prestige" },
    { hero_name: "Psylocke", file_image: "psylocke_prestige" },
    { hero_name: "Rocket Raccoon", file_image: "rocket-raccoon_prestige" },
    { hero_name: "Scarlet Witch", file_image: "scarlet-witch_prestige" },
    { hero_name: "Spider-Man", file_image: "spider-man_prestige" },
    { hero_name: "Squirrel Girl", file_image: "squirrel-girl_prestige" },
    { hero_name: "Star-Lord", file_image: "star-lord_prestige" },
    { hero_name: "Storm", file_image: "storm_prestige" },
    { hero_name: "The Punisher", file_image: "the-punisher_prestige" },
    { hero_name: "The Thing", file_image: "the-thing_prestige" },
    { hero_name: "Thor", file_image: "thor_prestige" },
    { hero_name: "Venom", file_image: "venom_prestige" },
    { hero_name: "Winter Soldier", file_image: "winter-soldier_prestige" },
    { hero_name: "Wolverine", file_image: "wolverine_prestige" }
]

const downloadData = async () => {

}
