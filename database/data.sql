-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "category" ("name", "imageUrl")
values ('Plumeria', '/images/starWhite.jpg'),
('Dragon Fruit', '/images/halleysComet.jpg'),
('Assorted', '/images/hass.jpg');

insert into "product" ("name", "details", "price", "imageUrl", "categoryId")
values ('Star White','Incredible white plumeria that blooms on nearly every tip early in the season, with inflos lasting nearly 3 months. Medium growing tree with vivid, dark green foliage. Strong floral scent, similar to jasmine.', '20', '/images/starWhite.jpg', '1'),
('Jester', 'Name aside, this plumeria is no joke. Each flower manages to look fantastic in a wide range of temperatures. Highly changeable, the pink, yellow, orange colors appear in many combinations, including a vibrant coral red in high heat. Standard growth habit, corrugated leaves, and nicely sized inflos, very thick flowers over 3”. Blooms do not fade and they last forever. Unusual fresh sweet mushroom scent.', '25', '/images/jester.jpg', '1'),
('Mystique', 'Elegantly shaped, 2 1/2" medium pink blooms with a huge orange yellow center, pointed petals and lovely rolled white edge. Blooms in dense clusters. Medium sweet scent, a bit fruity. Dwarf growth habit, outstanding bloom production and a lovely balanced tree.', '35', '/images/mystique.jpg', '1'),
('Treasure Isle', 'Blooms', '35', '/images/treasureIsle.jpg', '1'),
('Bali Whirl', 'The only known, and very unique, 9-12 petal yellow / white plumeria, discovered in Indonesia. Excellent lemony citrus fragrance. Strong grower, with a semi-compact to medium growth habit.', '40', '/images/baliWhirl.jpg', '1'),
('Candy Stripe','Very colorful and striking blend of white, red and yellowish orange stripes covering the entire flower. Very vigorous growth sweetly scented. Tendency to produce blooms with six or more petals. Profuse and reliable bloomer. Rarely sets seed. ', '45', '/images/candyStripe.jpg', '1'),
('Gina', 'Heavy bloomer with beautiful, thick, almost burgundy red 3 1/2" flowers with a contrasting creamy white upturned edge. Cooler weather allows bright coppery orange colors to come through. Intense non-fading colors and long flowering period. Mild spicy fragrance gets stronger in the evening. Strong semi-compact to medium grower with thick, shiny oval leaves and good branching.', '50', '/images/gina.jpg', '1'),
('Jeannie Moragne', 'Jeannie Moragne boasts a vibrant red hue that gracefully fades to a mesmerizing reddish pink. Its large golden yellow bands and pinkish orange lines radiate toward the outer edges of the petals, creating a stunning visual display. The narrow petals with pointed tips are slightly overlapped and offer a heavy texture, adding to their allure.', '55', '/images/jeannieMoragne.jpg', '1'),
('White Shell', 'White Shell earned its name due to its distinctive habit of partially open flowers that resemble seashells, particularly in early spring and cooler weather. These flowers have white petals with a yellow center and pink edges, creating a visually striking display. The fragrance is strong and sweet, adding to the overall sensory experience.', '60', '/images/whiteShell.jpg', '1'),
('Palora Dragon fruit', 'Palora is a Dragon Fruit variety from the genus Selenicereus and the species megalanthus. Growth is not as sensitive and more aggressive with a similar appearance, and fruits are more significant with the same flavor and texture.', '10', '/images/pallora.jpg', '2'),
('Halleys Comet Dragon Fruit', 'Halleys Comet Dragon Fruit is a hybrid variety that comes from Hylocereus undatus and Hylocereus guatemalensis. Fruits have a pink outside with green abbreviated fins and purple flesh inside. The flesh is sweet and the flower blooms are over 13 inches across and it blooms all summer. This variety is a strong but less aggressive grower and can tolerate full sun with minimal sun burn.', '50', '/images/halleysComet.jpg', '2'),
('Succulent', 'Drought tolerant, low maintenance, indoor or outdoor', '15', '/images/pokey.jpg', '3'),
('Hass Avocado', 'The Hass avocado is one of the most delicious varieties of avocado around, with a rich creamy flesh and superior taste. Hass avocados make up 95% of all the avocados eaten in the USA.', '70', '/images/hass.jpg', '3');

insert into "carousel" ("name", "imageUrl")
values ('Gnome', '/images/gnome.jpg'),
('Mystique', '/images/mystique.jpg'),
('Star White', '/images/starWhite.jpg'),
('Treasure Isle', '/images/treasureIsle.jpg'),
('Candy Stripe', '/images/candyStripe.jpg'),
('Jester', '/images/jester.jpg');

insert into "user" ("username", "hashedPassword")
values ('twoosam', 'password1');

