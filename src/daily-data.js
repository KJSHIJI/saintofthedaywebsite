/* Saint of the Day - Daily Content Database */

const DAILY_CONTENT = {
    "01-01": {
        date: "January 1",
        saint: "The Circumcision of Jesus",
        prayer: "Dear Jesus, as You were named and set apart for us, help us to live holy lives dedicated to God. Give us hearts willing to follow Your path with joy and peace.",
        scripture: "Luke 2:21",
        scriptureText: "And after eight days were accomplished, that the child should be circumcised, His name was called Jesus, which was called by the angel before He was conceived in the womb.",
        meaning: "Jesus followed the laws of God and showed us that holiness means obedience to God's love.",
        story: "When Jesus was born in Bethlehem, His parents, Mary and Joseph, loved Him with a tenderness no earthly parents had ever known. Yet though He was God's Son, Jesus came to live as a true human child, subject to God's law. Eight days after His birth, the law of Moses required that every son be circumcised, and so Mary and Joseph brought their precious Child to the Temple. As the priest performed this ancient ritual, baby Jesus accepted this sign of the covenant between God and His people. In that moment, the Son of God—who could have commanded the stars themselves—humbly submitted to His parents and to God's law. This was His first sacrifice of love, teaching all of us that true greatness lies not in power or pride, but in loving obedience. Jesus calls each of us to this same kind of obedience: not bitter or forced, but joyful and free, given out of love for God.",
        thought: "When we obey God with joy, even in small things, we become more like Jesus.",
        action: "Do one chore today without being asked, showing obedience to your parents out of love."
    },
"08-21": {
        date: "August 21",
        saint: "Saint Pius X, Pope",
        prayer: "Saint Pius X, humble shepherd of God’s people, pray for us. Teach us to love Jesus with a simple and trusting heart. Help us grow closer to Him, especially through the Holy Eucharist.",
        scripture: "John 6:35",
        scriptureText: "Jesus said to them: I am the bread of life. He that cometh to me shall not hunger; and he that believeth in me shall never thirst.",
        meaning: "Saint Pius X reminds us that Jesus wants to be close to us and invites even children to receive Him with love in the Holy Eucharist.",
        story: "Long ago in a small village in Italy, a poor boy named Giuseppe Sarto grew up helping his family and serving at church. His parents were not rich, but they taught him to love God above all things. Giuseppe worked very hard in school and became a priest, then a bishop, and later the Pope. When he became Pope Pius X, he did not live in luxury or pride. He stayed simple, kind, and close to ordinary people. He loved children very much and believed they should not be kept away from Jesus. At that time, many people thought children should wait many years before receiving Holy Communion. Pope Pius X changed this because he knew Jesus wants children to come to Him early, with pure hearts and simple faith. Because of him, children today can receive Jesus in the Eucharist at a young age. Pope Pius X also protected the Church by teaching the truth with courage. His life shows us that holiness is not about being powerful or famous, but about loving Jesus with humility and trust.",
        thought: "Jesus loves simple hearts and wants to be close to us, especially in the Eucharist.",
        action: "Spend a quiet moment today thanking Jesus for His presence in the Holy Eucharist."
    },
    "12-25": {
        date: "December 25",
        saint: "The Nativity of Our Lord Jesus Christ",
        prayer: "Thank You, Jesus, for coming to save us. Help us to remember that in the simplest places, You are present. Give us hearts full of wonder and love for this great gift.",
        scripture: "Luke 2:1-7",
        scriptureText: "And it came to pass that in those days there went out a decree from Caesar Augustus, that the whole world should be enrolled. And all went to be enrolled, every one in his own city. And Joseph also went up from Galilee, out of the city of Nazareth into Judea, to the city of David, which is called Bethlehem: because he was of the house and family of David. That he might be enrolled with Mary his espoused wife, who was with child. And it came to pass, that when they were there, her days were accomplished, that she should be delivered. And she brought forth her firstborn son, and wrapped him up in swaddling clothes, and laid him in a manger; because there was no room for them in the inn.",
        meaning: "Jesus, the King of all creation, chose to be born in poverty and simplicity to show us that God's love reaches everyone.",
        story: "On a cold winter's night in a small town called Bethlehem, something extraordinary happened. Mary and Joseph had traveled far from home, tired and seeking shelter. When they arrived, every inn was full—there was no room anywhere. So they found their way to a humble stable, where animals were kept for warmth. It was in this simple place, surrounded by hay and the gentle sounds of cattle, that Jesus was born. Mary wrapped her newborn Son in the cloth she had brought, and laid Him in a manger—the place where animals ate their food. This was the beginning of the great love story between God and mankind. The King of Heaven chose poverty, not because He had to, but to show us that He loves the poor and humble. He wanted everyone to know that God does not come in golden robes or marble palaces, but in humility and gentleness. Every child who feels lonely, every person who feels forgotten, can look at the baby Jesus in that stable and know: God sees you, God loves you, God came for you.",
        thought: "God's greatest gift came not in a palace, but in a stable, to show us He loves everyone.",
        action: "Give a small gift to someone today who feels left out or lonely, just as Jesus was born in a humble stable."
    },

    "01-02": {
        date: "January 2",
        saint: "Saint Basil the Great and Saint Gregory of Nazianzus",
        prayer: "Holy Basil and Gregory, teachers of wisdom and holiness, pray for us that we may grow in learning and kindness. Help us to be brave in speaking God's truth.",
        scripture: "2 Timothy 2:15",
        scriptureText: "Carefully study to present thyself to God approved, a workman that needeth not to be ashamed, rightly handling the word of truth.",
        meaning: "We become wise and strong when we study God's truth and share it with love.",
        story: "Long ago in a land called Cappadocia, two friends grew up together. Their names were Basil and Gregory. Both came from families that loved God deeply, and both were brilliant students who read every book they could find. When they grew older, they became priests and great teachers of the Church. Basil founded monasteries where monks lived together, praying and working and studying Scripture. Gregory became known as 'the Theologian' because he taught so many people about God's nature and God's love. These two friends showed that it is beautiful and holy to use our minds to understand God better. They wrote letters to each other that are still read today. But more than being smart, Basil and Gregory were kind. Basil helped poor people and started the first hospital. Gregory stood up for truth even when it was dangerous. They taught that real wisdom is not just knowing many things—it is knowing God and living with love. The story of their friendship shows us that the smartest thing we can do is make friends who help us grow closer to God.",
        thought: "The best friendships help us grow not just smarter, but holier.",
        action: "Spend time today learning something new about God, then tell a friend what you learned."
    }
};

// Add placeholder entries for all days of the year
function generatePlaceholders() {
    const days = [
        // January
        ...Array.from({ length: 31 }, (_, i) => `01-${String(i + 1).padStart(2, '0')}`),
        // February
        ...Array.from({ length: 28 }, (_, i) => `02-${String(i + 1).padStart(2, '0')}`),
        // March
        ...Array.from({ length: 31 }, (_, i) => `03-${String(i + 1).padStart(2, '0')}`),
        // April
        ...Array.from({ length: 30 }, (_, i) => `04-${String(i + 1).padStart(2, '0')}`),
        // May
        ...Array.from({ length: 31 }, (_, i) => `05-${String(i + 1).padStart(2, '0')}`),
        // June
        ...Array.from({ length: 30 }, (_, i) => `06-${String(i + 1).padStart(2, '0')}`),
        // July
        ...Array.from({ length: 31 }, (_, i) => `07-${String(i + 1).padStart(2, '0')}`),
        // August
        ...Array.from({ length: 31 }, (_, i) => `08-${String(i + 1).padStart(2, '0')}`),
        // September
        ...Array.from({ length: 30 }, (_, i) => `09-${String(i + 1).padStart(2, '0')}`),
        // October
        ...Array.from({ length: 31 }, (_, i) => `10-${String(i + 1).padStart(2, '0')}`),
        // November
        ...Array.from({ length: 30 }, (_, i) => `11-${String(i + 1).padStart(2, '0')}`),
        // December
        ...Array.from({ length: 31 }, (_, i) => `12-${String(i + 1).padStart(2, '0')}`)
    ];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    days.forEach(key => {
        if (!DAILY_CONTENT[key]) {
            const [month, day] = key.split("-");
            const monthName = monthNames[parseInt(month, 10) - 1];

            DAILY_CONTENT[key] = {
                date: `${monthName} ${parseInt(day, 10)}`,
                saint: "(Content needed — add verified facts here)",
                prayer: "(Content needed — add verified facts here)",
                scripture: "(Content needed — add verified facts here)",
                scriptureText: "(Content needed — add verified facts here)",
                meaning: "(Content needed — add verified facts here)",
                story: "(Content needed — add verified facts here)",
                thought: "(Content needed — add verified facts here)",
                action: "(Content needed — add verified facts here)"
            };
        }
    });
}

// Generate all placeholders on load
generatePlaceholders();
