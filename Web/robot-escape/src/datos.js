export var lista = {
        "datos": [
            {
                "stage": 1,
                "data": {
                    "labels": [
                        "Stage 1"
                    ],
                    "datasets": [
                        {
                            label: 'Room 1 ',
                            "data": [
                                5
                            ],
                            "backgroundColor": "rgba(63,103,126,1)",
                            "hoverBackgroundColor": "rgba(50,90,100,1)"
                        },
                        {
                            label: 'Room 2 ',
                            "data": [
                                9
                            ],
                            "backgroundColor": "rgba(163,103,126,1)",
                            "hoverBackgroundColor": "rgba(140,85,100,1)"
                        },
                        {
                            label: 'Room 3 ',
                            "data": [
                                14
                            ],
                            "backgroundColor": "rgba(63,203,226,1)",
                            "hoverBackgroundColor": "rgba(46,185,235,1)"
                        }
                    ]
                },
                "time": 360,
                "options": {
                    "indexAxis": "y",
                    "scales": {
                        "x": {
                            "stacked": true,
                            "display": false
                        },
                        "y": {
                            "stacked": true,
                            "display": false
                        }
                    },
                    "plugins": {
                        "legend": {
                            "display": false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
            
                                    if (label) {
                                        label += ' \n ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += " Time: " + context.dataset.data + "s";
                                    }
                                    return label;
                                },
                                
                            },
                            bodyFont: {
                               weight: 'bold'
                            },
                            backgroundColor: 'midnightblue',
                        },
                    }
                }
            },
            {
                "stage": 2,
                "data": {
                    "labels": [
                        "2015"
                    ],
                    "datasets": [
                        {
                            "data": [
                                727
                            ],
                            "backgroundColor": "rgba(63,103,126,1)",
                            "hoverBackgroundColor": "rgba(50,90,100,1)"
                        },
                        {
                            "data": [
                                238
                            ],
                            "backgroundColor": "rgba(163,103,126,1)",
                            "hoverBackgroundColor": "rgba(140,85,100,1)"
                        },
                        {
                            "data": [
                                1238
                            ],
                            "backgroundColor": "rgba(63,203,226,1)",
                            "hoverBackgroundColor": "rgba(46,185,235,1)"
                        }
                    ]
                },
                "time": 740,
                "options": {
                    "indexAxis": "y",
                    "scales": {
                        "x": {
                            "stacked": true,
                            "display": false
                        },
                        "y": {
                            "stacked": true,
                            "display": false
                        }
                    },
                    "plugins": {
                        "legend": {
                            "display": false
                        }
                    }
                }
            }
        ]
    }