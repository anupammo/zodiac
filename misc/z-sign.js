/* script by © Anupam Mondal for ZSign */
function bdate() {
    var input = document.getElementById('bd').value;
    var d = new Date(input);

    if (!!d.valueOf()) { // Valid date
        year = d.getFullYear();
        month = d.getMonth();
        day = d.getDate();

        if ((month == 11) && ((day > 15)) || (month == 0) && ((day < 15))) {
            document.getElementById("z-sign").src = "res/sagittarius-b.webp";
        } else if ((month == 0) && ((day > 14)) || (month == 1) && ((day < 15))) {
            document.getElementById("z-sign").src = "res/capricorn-b.webp";
        } else if ((month == 1) && ((day > 14)) || (month == 2) && ((day < 15))) {
            document.getElementById("z-sign").src = "res/aquarius-b.webp";
        } else if ((month == 2) && ((day > 14)) || (month == 3) && ((day < 15))) {
            document.getElementById("z-sign").src = "res/pisces-b.webp";
        } else if ((month == 3) && ((day > 14)) || (month == 4) && ((day < 16))) {
            document.getElementById("z-sign").src = "res/aries-b.webp";
        } else if ((month == 4) && ((day > 15)) || (month == 5) && ((day < 16))) {
            document.getElementById("z-sign").src = "res/taurus-b.webp";
        } else if ((month == 5) && ((day > 15)) || (month == 6) && ((day < 16))) {
            document.getElementById("z-sign").src = "res/gemini-b.webp";
        } else if ((month == 6) && ((day > 15)) || (month == 7) && ((day < 16))) {
            document.getElementById("z-sign").src = "res/cancer-b.webp";
        } else if ((month == 7) && ((day > 15)) || (month == 8) && ((day < 16))) {
            document.getElementById("z-sign").src = "res/leo-b.webp";
        } else if ((month == 8) && ((day > 15)) || (month == 9) && ((day < 16))) {
            document.getElementById("z-sign").src = "res/virgo-b.webp";
        } else if ((month == 9) && ((day > 16)) || (month == 10) && ((day < 17))) {
            document.getElementById("z-sign").src = "res/libra-b.webp";
        } else if ((month == 10) && ((day > 16)) || (month == 11) && ((day < 16))) {
            document.getElementById("z-sign").src = "res/scorpio-b.webp";
        } else {
            document.getElementById("bdate").innerHTML = "Others";
        }
    } else {
        document.getElementById("bdate").innerHTML = "Invalid date";
    }
}