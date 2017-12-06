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
    }]

    dTree.init(treeData, {
        target: "#graph",
        debug: true,
        height: 800,
        width: 1200,
        callbacks: {
            nodeClick: function (name, extra) {
                console.log(name);
            }
        }
    })
};
