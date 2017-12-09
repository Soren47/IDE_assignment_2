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
                    "name": "Melanie Trump",
                    "class": "woman"
                },
                "children": [
                    {
                        "name": "Baron Trump",
                        "class": "man",
                    }
                ]
            }
        ]
    }];


    var allPhotoTexts = {"Ivana Trump" : "By Christopherpeterson at English Wikipedia, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=3071583 - File:Ivana Trump.jpg, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=50250176",
                         "Donald Trump" : "By Shealah Craighead - https://www.whitehouse.gov/the-press-office/2017/10/31/white-house-releases-official-portraits-president-donald-j-trump-and, Public Domain, https://commons.wikimedia.org/w/index.php?curid=63768460",
                        "Donald Trump Jr." : "By Gage Skidmore, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=52590948",
                        "b" : "c"

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



                var newPhotoText = allPhotoTexts[name];
                //console.log(newPhotoText);

                photo.attr("src", "ass3_images/" + name + ".jpg");

                d3.select("body").select("#photoText").text(newPhotoText);





            }
        }
    })





};
