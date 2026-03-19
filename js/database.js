// js/database.js

// Función para calcular la edad automáticamente. Se mantiene aquí para estar junto a los datos.
function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return 'N/A';
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

const db = {
    pilotos: {
        "lewis_hamilton": {
            nombreCompleto: "Lewis Hamilton",
            fechaNacimiento: "1985-01-07",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "Siete veces campeón del mundo, Lewis Hamilton ha reescrito los libros de récords de la F1. Desde su fenomenal debut en 2007 hasta su dominio con Mercedes, es una leyenda viviente.",
            campeonatos: [2008, 2014, 2015, 2017, 2018, 2019, 2020],
            imagenPerfil: "images/drivers/hamilton.png",
            imagenCoche: "images/cars/mercedes_w12.png"
        },
        "michael_schumacher": {
            nombreCompleto: "Michael Schumacher",
            fechaNacimiento: "1969-01-03",
            nacionalidad: { nombre: "Alemania", codigo: "de" },
            biografia: "El 'Káiser' dominó la F1 a principios de los 2000 con Ferrari. Sus siete títulos y su ética de trabajo transformaron el deporte.",
            campeonatos: [1994, 1995, 2000, 2001, 2002, 2003, 2004],
            imagenPerfil: "images/drivers/schumacher.png",
            imagenCoche: "images/cars/ferrari_f2004.png"
        },
        "max_verstappen": {
            nombreCompleto: "Max Verstappen",
            fechaNacimiento: "1997-09-30",
            nacionalidad: { nombre: "Países Bajos", codigo: "nl" },
            biografia: "Una fuerza imparable, Verstappen trajo el campeonato de vuelta a Red Bull con un estilo de conducción agresivo y preciso.",
            campeonatos: [2021, 2022, 2023, 2024],
            imagenPerfil: "images/drivers/verstappen.png",
            imagenCoche: "images/cars/redbull_rb19.png"
        },
        "giuseppe_farina": {
            nombreCompleto: "Giuseppe Farina",
            fechaNacimiento: "1906-10-30",
            nacionalidad: { nombre: "Italia", codigo: "it" },
            biografia: "El primer Campeón Mundial de F1 de la historia en 1950, conduciendo para Alfa Romeo.",
            campeonatos: [1950],
            imagenPerfil: "images/drivers/farina.png",
            imagenCoche: ""
        },
         "juan_manuel_fangio": {
            nombreCompleto: "Juan Manuel Fangio",
            fechaNacimiento: "1911-06-24",
            nacionalidad: { nombre: "Argentina", codigo: "ar" },
            biografia: "El 'Maestro'. Ganó 5 títulos con 4 marcas diferentes, un récord de versatilidad y talento que perdura en la historia.",
            campeonatos: [1951, 1954, 1955, 1956, 1957],
            imagenPerfil: "images/drivers/fangio.png",
            imagenCoche: ""
        },
        "alberto_ascari": {
            nombreCompleto: "Alberto Ascari",
            fechaNacimiento: "1918-07-13",
            nacionalidad: { nombre: "Italia", codigo: "it" },
            biografia: "El último italiano en ganar el título con Ferrari, dominó las temporadas de 1952 y 1953.",
            campeonatos: [1952, 1953],
            imagenPerfil: "images/drivers/ascari.png",
            imagenCoche: ""
        },
        "mike_hawthorn": {
            nombreCompleto: "Mike Hawthorn",
            fechaNacimiento: "1929-04-10",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "El primer campeón británico de F1, ganando el título en 1958 con Ferrari.",
            campeonatos: [1958],
            imagenPerfil: "images/drivers/hawthorn.png",
            imagenCoche: ""
        },
        "jack_brabham": {
            nombreCompleto: "Jack Brabham",
            fechaNacimiento: "1926-04-02",
            nacionalidad: { nombre: "Australia", codigo: "au" },
            biografia: "El único piloto en ganar el campeonato conduciendo su propio coche (1966).",
            campeonatos: [1959, 1960, 1966],
            imagenPerfil: "images/drivers/brabham.png",
            imagenCoche: ""
        },
        "phil_hill": {
            nombreCompleto: "Phil Hill",
            fechaNacimiento: "1927-04-20",
            nacionalidad: { nombre: "EE.UU.", codigo: "us" },
            biografia: "Primer campeón estadounidense, logrando el título con Ferrari en 1961.",
            campeonatos: [1961],
            imagenPerfil: "images/drivers/p_hill.png",
            imagenCoche: ""
        },
        "graham_hill": {
            nombreCompleto: "Graham Hill",
            fechaNacimiento: "1929-02-15",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "El único piloto en ganar la Triple Corona del Automovilismo (Mónaco, Le Mans e Indianápolis).",
            campeonatos: [1962, 1968],
            imagenPerfil: "images/drivers/g_hill.png",
            imagenCoche: ""
        },
        "jim_clark": {
            nombreCompleto: "Jim Clark",
            fechaNacimiento: "1936-03-04",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "Un talento natural incomparable, dominó con Lotus en los 60 antes de su trágica muerte.",
            campeonatos: [1963, 1965],
            imagenPerfil: "images/drivers/clark.png",
            imagenCoche: ""
        },
        "john_surtees": {
            nombreCompleto: "John Surtees",
            fechaNacimiento: "1934-02-11",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "El único hombre en ganar campeonatos mundiales tanto en dos ruedas (MotoGP) como en cuatro (F1).",
            campeonatos: [1964],
            imagenPerfil: "images/drivers/surtees.png",
            imagenCoche: ""
        },
        "denny_hulme": {
            nombreCompleto: "Denny Hulme",
            fechaNacimiento: "1936-06-18",
            nacionalidad: { nombre: "Nueva Zelanda", codigo: "nz" },
            biografia: "Campeón en 1967 con Brabham, conocido por su carácter rudo y consistente.",
            campeonatos: [1967],
            imagenPerfil: "images/drivers/hulme.png",
            imagenCoche: ""
        },
        "jackie_stewart": {
            nombreCompleto: "Jackie Stewart",
            fechaNacimiento: "1939-06-11",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "Ganador de tres títulos y pionero en la seguridad de la Fórmula 1.",
            campeonatos: [1969, 1971, 1973],
            imagenPerfil: "images/drivers/stewart.png",
            imagenCoche: ""
        },
        "jochen_rindt": {
            nombreCompleto: "Jochen Rindt",
            fechaNacimiento: "1942-04-18",
            nacionalidad: { nombre: "Austria", codigo: "at" },
            biografia: "El único campeón póstumo de la F1, coronado en 1970 tras su accidente en Monza.",
            campeonatos: [1970],
            imagenPerfil: "images/drivers/rindt.png",
            imagenCoche: ""
        },
        "emerson_fittipaldi": {
            nombreCompleto: "Emerson Fittipaldi",
            fechaNacimiento: "1946-12-12",
            nacionalidad: { nombre: "Brasil", codigo: "br" },
            biografia: "El primer brasileño en ganar el título, abriendo la puerta a una nación de pilotos.",
            campeonatos: [1972, 1974],
            imagenPerfil: "images/drivers/fittipaldi.png",
            imagenCoche: ""
        },
        "niki_lauda": {
            nombreCompleto: "Niki Lauda",
            fechaNacimiento: "1949-02-22",
            nacionalidad: { nombre: "Austria", codigo: "at" },
            biografia: "Sobrevivió a un terrible accidente en 1976 y volvió para ganar dos títulos más. Una leyenda de determinación.",
            campeonatos: [1975, 1977, 1984],
            imagenPerfil: "images/drivers/lauda.png",
            imagenCoche: ""
        },
        "james_hunt": {
            nombreCompleto: "James Hunt",
            fechaNacimiento: "1947-08-29",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "Campeón en 1976 tras una épica batalla con Lauda, icono de la F1 rebelde de los 70.",
            campeonatos: [1976],
            imagenPerfil: "images/drivers/hunt.png",
            imagenCoche: ""
        },
        "mario_andretti": {
            nombreCompleto: "Mario Andretti",
            fechaNacimiento: "1940-02-28",
            nacionalidad: { nombre: "EE.UU.", codigo: "us" },
            biografia: "Leyenda del automovilismo mundial, campeón en 1978 con el innovador Lotus con efecto suelo.",
            campeonatos: [1978],
            imagenPerfil: "images/drivers/andretti.png",
            imagenCoche: ""
        },
        "jody_scheckter": {
            nombreCompleto: "Jody Scheckter",
            fechaNacimiento: "1950-01-29",
            nacionalidad: { nombre: "Sudáfrica", codigo: "za" },
            biografia: "Único campeón africano de la historia, ganó con Ferrari en 1979.",
            campeonatos: [1979],
            imagenPerfil: "images/drivers/scheckter.png",
            imagenCoche: ""
        },
        "alan_jones": {
            nombreCompleto: "Alan Jones",
            fechaNacimiento: "1946-11-02",
            nacionalidad: { nombre: "Australia", codigo: "au" },
            biografia: "El primer campeón de Williams, rudo y efectivo, en 1980.",
            campeonatos: [1980],
            imagenPerfil: "images/drivers/jones.png",
            imagenCoche: ""
        },
        "nelson_piquet": {
            nombreCompleto: "Nelson Piquet",
            fechaNacimiento: "1952-08-17",
            nacionalidad: { nombre: "Brasil", codigo: "br" },
            biografia: "Tres veces campeón, tácticamente brillante y conocido por su lengua afilada.",
            campeonatos: [1981, 1983, 1987],
            imagenPerfil: "images/drivers/piquet.png",
            imagenCoche: ""
        },
        "keke_rosberg": {
            nombreCompleto: "Keke Rosberg",
            fechaNacimiento: "1948-12-06",
            nacionalidad: { nombre: "Finlandia", codigo: "fi" },
            biografia: "El 'Holandés Volador' (aunque finlandés), campeón en 1982 ganando solo una carrera.",
            campeonatos: [1982],
            imagenPerfil: "images/drivers/rosberg.png",
            imagenCoche: ""
        },
        "alain_prost": {
            nombreCompleto: "Alain Prost",
            fechaNacimiento: "1955-02-24",
            nacionalidad: { nombre: "Francia", codigo: "fr" },
            biografia: "El 'Profesor'. Cuatro títulos y una rivalidad legendaria con Senna definieron su carrera.",
            campeonatos: [1985, 1986, 1989, 1993],
            imagenPerfil: "images/drivers/prost.png",
            imagenCoche: ""
        },
        "ayrton_senna": {
            nombreCompleto: "Ayrton Senna",
            fechaNacimiento: "1960-03-21",
            nacionalidad: { nombre: "Brasil", codigo: "br" },
            biografia: "Para muchos, el más grande. Tres títulos con McLaren y una velocidad pura inigualable.",
            campeonatos: [1988, 1990, 1991],
            imagenPerfil: "images/drivers/senna.png",
            imagenCoche: "images/cars/mclaren_mp4_4.png"
        },
        "nigel_mansell": {
            nombreCompleto: "Nigel Mansell",
            fechaNacimiento: "1953-08-08",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "El 'León'. Campeón en 1992 con el dominante Williams FW14B.",
            campeonatos: [1992],
            imagenPerfil: "images/drivers/mansell.png",
            imagenCoche: ""
        },
        "damon_hill": {
            nombreCompleto: "Damon Hill",
            fechaNacimiento: "1960-09-17",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "Hijo de Graham Hill, se convirtió en el primer hijo de un campeón en ganar el título en 1996.",
            campeonatos: [1996],
            imagenPerfil: "images/drivers/d_hill.png",
            imagenCoche: ""
        },
        "jacques_villeneuve": {
            nombreCompleto: "Jacques Villeneuve",
            fechaNacimiento: "1971-04-09",
            nacionalidad: { nombre: "Canadá", codigo: "ca" },
            biografia: "Hijo de Gilles, logró lo que su padre no pudo: el campeonato mundial en 1997 contra Schumacher.",
            campeonatos: [1997],
            imagenPerfil: "images/drivers/villeneuve.png",
            imagenCoche: ""
        },
        "mika_hakkinen": {
            nombreCompleto: "Mika Häkkinen",
            fechaNacimiento: "1968-09-28",
            nacionalidad: { nombre: "Finlandia", codigo: "fi" },
            biografia: "El 'Finlandés Volador' que desafió y venció a Schumacher a finales de los 90.",
            campeonatos: [1998, 1999],
            imagenPerfil: "images/drivers/hakkinen.png",
            imagenCoche: ""
        },
        "fernando_alonso": {
            nombreCompleto: "Fernando Alonso",
            fechaNacimiento: "1981-07-29",
            nacionalidad: { nombre: "España", codigo: "es" },
            biografia: "Terminó con la hegemonía de Schumacher. Un talento generacional conocido por su implacabilidad.",
            campeonatos: [2005, 2006],
            imagenPerfil: "images/drivers/alonso.png",
            imagenCoche: "images/cars/renault_r25.png"
        },
        "kimi_raikkonen": {
            nombreCompleto: "Kimi Räikkönen",
            fechaNacimiento: "1979-10-17",
            nacionalidad: { nombre: "Finlandia", codigo: "fi" },
            biografia: "'The Iceman'. Campeón con Ferrari en 2007 en una de las definiciones más ajustadas de la historia.",
            campeonatos: [2007],
            imagenPerfil: "images/drivers/raikkonen.png",
            imagenCoche: ""
        },
        "jenson_button": {
            nombreCompleto: "Jenson Button",
            fechaNacimiento: "1980-01-19",
            nacionalidad: { nombre: "Reino Unido", codigo: "gb" },
            biografia: "Campeón en 2009 con el equipo de cuento de hadas Brawn GP.",
            campeonatos: [2009],
            imagenPerfil: "images/drivers/button.png",
            imagenCoche: ""
        },
        "sebastian_vettel": {
            nombreCompleto: "Sebastian Vettel",
            fechaNacimiento: "1987-07-03",
            nacionalidad: { nombre: "Alemania", codigo: "de" },
            biografia: "Dominó con Red Bull Racing ganando 4 títulos consecutivos (2010-2013).",
            campeonatos: [2010, 2011, 2012, 2013],
            imagenPerfil: "images/drivers/vettel.png",
            imagenCoche: ""
        },
        "nico_rosberg": {
            nombreCompleto: "Nico Rosberg",
            fechaNacimiento: "1985-06-27",
            nacionalidad: { nombre: "Alemania", codigo: "de" },
            biografia: "Venció a Hamilton en 2016 con el mismo coche y se retiró como campeón.",
            campeonatos: [2016],
            imagenPerfil: "images/drivers/n_rosberg.png",
            imagenCoche: ""
        }
    },

    equipos: {
        "ferrari": {
            nombreCompleto: "Scuderia Ferrari",
            paisBase: { nombre: "Italia", codigo: "it" },
            jefeEquipo: "Frédéric Vasseur",
            chasisActual: "SF-24",
            motor: "Ferrari",
            biografia: "Sinónimo de F1. El equipo más laureado de la historia.",
            campeonatos: [1961, 1964, 1975, 1976, 1977, 1979, 1982, 1983, 1999, 2000, 2001, 2002, 2003, 2004, 2007, 2008],
            logo: "images/logos/ferrari.png"
        },
        "mclaren": {
            nombreCompleto: "McLaren F1 Team",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "Andrea Stella",
            chasisActual: "MCL38",
            motor: "Mercedes",
            biografia: "Innovación y éxito. Segundo equipo más laureado.",
            campeonatos: [1974, 1984, 1985, 1988, 1989, 1990, 1991, 1998, 2024],
            logo: "images/logos/mclaren.png"
        },
        "mercedes": {
            nombreCompleto: "Mercedes-AMG Petronas F1 Team",
            paisBase: { nombre: "Reino Unido", codigo: "de" }, 
            jefeEquipo: "Toto Wolff",
            chasisActual: "W15",
            motor: "Mercedes",
            biografia: "Dominio absoluto en la era híbrida con 8 títulos de constructores consecutivos (2014-2021).",
            campeonatos: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
            logo: "images/logos/mercedes.png"
        },
         "red_bull_racing": {
            nombreCompleto: "Oracle Red Bull Racing",
            paisBase: { nombre: "Reino Unido", codigo: "at" }, 
            jefeEquipo: "Christian Horner",
            chasisActual: "RB20",
            motor: "Honda RBPT",
            biografia: "De marca de bebidas a potencia mundial, ganando múltiples títulos con Vettel y Verstappen.",
            campeonatos: [2010, 2011, 2012, 2013, 2022, 2023],
            logo: "images/logos/redbull.png"
        },
        "williams": {
            nombreCompleto: "Williams Racing",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "James Vowles",
            chasisActual: "FW46",
            motor: "Mercedes",
            biografia: "El sueño de Frank Williams. Dominaron en los 80 y 90.",
            campeonatos: [1980, 1981, 1986, 1987, 1992, 1993, 1994, 1996, 1997],
            logo: "images/logos/williams.png"
        },
        "lotus": {
            nombreCompleto: "Team Lotus",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "Colin Chapman",
            chasisActual: "Retirado",
            motor: "Ford Cosworth",
            biografia: "Pioneros en aerodinámica y chasis monocasco. Leyendas como Clark y Senna corrieron aquí.",
            campeonatos: [1963, 1965, 1968, 1970, 1972, 1973, 1978],
            logo: "images/logos/lotus.png"
        },
        "renault": {
            nombreCompleto: "Renault F1 Team",
            paisBase: { nombre: "Francia", codigo: "fr" },
            jefeEquipo: "Flavio Briatore",
            chasisActual: "Retirado",
            motor: "Renault",
            biografia: "Campeones en 2005 y 2006 con Alonso.",
            campeonatos: [2005, 2006],
            logo: "images/logos/renault.png"
        },
        "benetton": {
            nombreCompleto: "Benetton Formula",
            paisBase: { nombre: "Reino Unido", codigo: "it" },
            jefeEquipo: "Flavio Briatore",
            chasisActual: "Retirado",
            motor: "Renault/Ford",
            biografia: "El equipo colorido que llevó a Schumacher a sus primeros títulos.",
            campeonatos: [1995],
            logo: "images/logos/benetton.png"
        },
         "brawn_gp": {
            nombreCompleto: "Brawn GP",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "Ross Brawn",
            chasisActual: "BGP 001",
            motor: "Mercedes",
            biografia: "El milagro de un año. Compraron Honda por £1 y ganaron ambos títulos en 2009.",
            campeonatos: [2009],
            logo: "images/logos/brawn.png"
        },
         "tyrrell": {
            nombreCompleto: "Tyrrell Racing",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "Ken Tyrrell",
            chasisActual: "Retirado",
            motor: "Ford",
            biografia: "Famosos por el coche de 6 ruedas y los títulos de Jackie Stewart.",
            campeonatos: [1971],
            logo: "images/logos/tyrrell.png"
        },
        "brabham": {
            nombreCompleto: "Brabham",
            paisBase: { nombre: "Reino Unido", codigo: "au" },
            jefeEquipo: "Bernie Ecclestone",
            chasisActual: "Retirado",
            motor: "Repco/BMW",
            biografia: "Fundado por Jack Brabham. Innovaron con el 'Fan Car' y ganaron con Piquet.",
            campeonatos: [1966, 1967],
            logo: "images/logos/brabham.png"
        },
        "cooper": {
            nombreCompleto: "Cooper Car Company",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "John Cooper",
            chasisActual: "Retirado",
            motor: "Climax",
            biografia: "Revolucionaron la F1 poniendo el motor atrás.",
            campeonatos: [1959, 1960],
            logo: "images/logos/cooper.png"
        },
        "vanwall": {
            nombreCompleto: "Vanwall",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "Tony Vandervell",
            chasisActual: "Retirado",
            motor: "Vanwall",
            biografia: "Los primeros campeones de constructores de la historia (1958).",
            campeonatos: [1958],
            logo: "images/logos/vanwall.png"
        },
        "brm": {
            nombreCompleto: "British Racing Motors",
            paisBase: { nombre: "Reino Unido", codigo: "gb" },
            jefeEquipo: "Alfred Owen",
            chasisActual: "Retirado",
            motor: "BRM",
            biografia: "Campeones en 1962 con Graham Hill.",
            campeonatos: [1962],
            logo: "images/logos/brm.png"
        },
        "matra": {
            nombreCompleto: "Matra Sports",
            paisBase: { nombre: "Francia", codigo: "fr" },
            jefeEquipo: "Jean-Luc Lagardère",
            chasisActual: "Retirado",
            motor: "Ford",
            biografia: "Campeones con Jackie Stewart en 1969.",
            campeonatos: [1969],
            logo: "images/logos/matra.png"
        }
    }
};