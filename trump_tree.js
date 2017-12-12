window.addEventListener('load', init);

function init() {
    treeData = [{
        "name": "Donald Trump",
        "class": "man",
        "marriages": [
            {
                "spouse":
                    {
                        "name": "Ivana Trump",
                        "class": "woman"
                    },
                "children": [
                    {
                        "name": "Donald Trump Jr.",
                        "class": "man",
                        "marriages": [
                            {
                                "spouse": {
                                    "name": "Vanessa Trump",
                                    "class": "woman"
                                },
                                "children": [
                                    {
                                        "name": "Kai Madison",
                                        "class": "man"
                                    },
                                    {
                                        "name": "Donald III",
                                        "class": "man"
                                    },
                                    {
                                        "name": "Chloe Sophia",
                                        "class": "woman"
                                    },
                                    {
                                        "name": "Tristan Milos",
                                        "class": "man"
                                    },
                                    {
                                        "name": "Spencer Frederick",
                                        "class": "man"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Ivanka Trump",
                        "class": "woman",
                        "marriages": [
                            {
                                "spouse": {
                                    "name": "Jared Kushner",
                                    "class": "man"
                                },
                                "children": [
                                    {
                                        "name": "Arabella Rose",
                                        "class": "woman"
                                    },
                                    {
                                        "name": "Joseph Frederick",
                                        "class": "man"
                                    },
                                    {
                                        "name": "Theodore James",
                                        "class": "man"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Eric Trump",
                        "class": "man",
                        "marriages": [
                            {
                                "spouse": {
                                    "name": "Lara Yunaska",
                                    "class": "woman"

                                }
                            }
                        ]
                    }
                ]
            },
            {
                "spouse": {
                    "name": "Marla Maples",
                    "class": "woman"
                },
                "children": [
                    {
                        "name": "Tiffany Trump",
                        "class": "woman"
                    }
                ]
            },
            {
                "spouse": {
                    "name": "Melania Trump",
                    "class": "woman"
                },
                "children": [
                    {
                        "name": "Barron Trump",
                        "class": "man"
                    }
                ]
            }
        ]
    }];


    var allPhotoTexts = {
        "Ivana Trump": "By Christopherpeterson at English Wikipedia, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=3071583 " +
        "- File:Ivana Trump.jpg, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=50250176",

        "Donald Trump": "By Shealah Craighead - https://www.whitehouse.gov/the-press-office/2017/10/31/white-house-releases-official-portraits-president-donald-j-trump-and," +
        " Public Domain, https://commons.wikimedia.org/w/index.php?curid=63768460",

        "Donald Trump Jr.": "By Gage Skidmore, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=52590948",

        "Donald Trump Jr._family": "Jen Blakele/Courtesy of Trump family",

        "Vanessa Trump": "Getty Images",

        "Ivanka Trump": "By Michael Vadon - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=63759407",

        "Jared Kushner": "By DoD Photo by Navy Petty Officer 2nd Class Dominique A. Pineiro, Office of the Chairman of the Joint" +
        " Chiefs of Staff for Public Affairs - https://www.flickr.com/photos/thejointstaff/33806148366/, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=61287038",

        "Eric Trump": "By Ali Shaker/VOA - http://m.voanews.com/a/photo-gallery-republican-national-convention-night-3/3428570.html," +
        " Public Domain, https://commons.wikimedia.org/w/index.php?curid=50358094",

        "Lara Yunaska": "By Rachel Larue - https://www.dvidshub.net/image/3108118/president-elect-donald-j-trump-" +
        "and-vice-president-elect-mike-pence-place-wreath-tomb-unknown, Public Domain, https://commons.wikimedia.org/w/index.php?curid=60203259",

        "Tiffany Trump": "By Ali Shaker/VOA - http://m.voanews.com/a/republican-national-convention/3426618.html, Public Domain, https://commons.wikimedia.org/w/index.php?curid=50358143",

        "Barron Trump": "Getty Images",

        "Ivanka Trump_family": "Joe Raedle/Getty Images",

        "Marla Maples": "By lukeford.net - http://www.lukeford.net/Images/photos4/071205/68.htm, CC BY 2.5, " +
        "https://commons.wikimedia.org/w/index.php?curid=4292871",

        "Melania Trump": "By Regine MahauxWeaver, Hilary (3 April 2017). Here's What You Should Know About Melania Trump's " +
        "Official First Lady Portrait. Vanity Fair. Archived from the original on 7 April 2017."
    };

    var photo = d3.select("body")
        .select("img");

    dTree.init(treeData, {
        target: "#graph",
        debug: true,
        height: 300,
        width: 800,
        callbacks: {
            nodeClick: function (name, extra) {
                console.log(name);

                if (name === "Kai Madison" || name === "Donald III" || name === "Chloe Sophia" || name === "Tristan Milos" || name === "Spencer Frederick") {

                    name = "Donald Trump Jr._family";

                }

                if (name === "Arabella Rose" || name === "Joseph Frederick" || name === "Theodore James") {

                    name = "Ivanka Trump_family";

                }


                var newPhotoText = allPhotoTexts[name];

                var photoName = "ass3_images/" + name + ".jpg";

                photo.attr("src", photoName);

                var newPhotoH = 0;
                var newPhotoW = 0;

                var img = document.getElementsByTagName("img")[0];

                img.onload=function() {

                    newPhotoH = 300;
                    newPhotoW = 300 * ( img.naturalWidth / img.naturalHeight );

                    photo.attr("src", photoName).attr("height", newPhotoH.toString()).attr("width", newPhotoW.toString());


                };

                d3.select("body").select("#photoText").text(newPhotoText);

            }
        }
    })


};
