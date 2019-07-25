// Infeasible model
let case1 = {'bosses':[{'id':1, 'name':'H','modules':[1,2,3],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[30,12,15],'capacity':1},
                             {'id':3, 'name':'J','modules':[6,2,4],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[9]},
                                   {'id':2, 'name':'J','modules':[8]},
                                   {'id':3, 'name':'H','modules':[7]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[],'bosses_new_modules':[]}
                    };

// Feasible model, but restrictions make it infeasible
let case2 = {'bosses':[{'id':1, 'name':'H','modules':[1,2,3,30],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[30,12,15,1],'capacity':1},
                             {'id':3, 'name':'J','modules':[1,6,2,3],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[1]},
                                   {'id':2, 'name':'J','modules':[2]},
                                   {'id':3, 'name':'H','modules':[3]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[{'id':1,'modules':[9]}, {'id':2, 'modules':[8]},{'id':3, 'modules':[7]}],
                'bosses_new_modules':[]}
                    };

// Infeasible model, but restrictions make it feasible. Only technician 1 is assigned

let case3 = {'bosses':[{'id':1, 'name':'H','modules':[1,2,3,30],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[30,12,15,1],'capacity':1},
                             {'id':3, 'name':'J','modules':[1,6,2,3],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[9]},
                                   {'id':2, 'name':'J','modules':[7]},
                                   {'id':3, 'name':'H','modules':[8]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[{'id': 1, 'modules':[1]}],'bosses_new_modules':[]}
                    };

// Feasible model, without restrictions all technicians assigned
let case4 = {'bosses':[{'id':1, 'name':'H','modules':[1,2,3,30],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[30,12,15],'capacity':1},
                             {'id':3, 'name':'J','modules':[1,6,2,3],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[1]},
                                   {'id':2, 'name':'J','modules':[2]},
                                   {'id':3, 'name':'H','modules':[3]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[],'bosses_new_modules':[]}
                    };
// Feasible model, order of the bosses is important. All technicians must be assigned
let case5 = {'bosses':[{'id':1, 'name':'H','modules':[1,2],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[1],'capacity':1},
                             {'id':3, 'name':'J','modules':[3],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[1]},
                                   {'id':2, 'name':'J','modules':[1]},
                                   {'id':3, 'name':'H','modules':[1]},
                                   {'id':4, 'name':'K','modules': [2]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[],'bosses_new_modules':[]}
                    };

// Feasible model, conmutable technicians. Tested with max capacity per module equal to 1.
// 2 conmutes with 1 and 3. Max 2 technicians assigned

let case6 = {'bosses':[{'id':1, 'name':'H','modules':[1],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[30,12,15],'capacity':1},
                             {'id':3, 'name':'J','modules':[2],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[1]},
                                   {'id':2, 'name':'J','modules':[1, 2]},
                                   {'id': 3, 'name': 'L', 'modules': [2]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[],'bosses_new_modules':[]}
                    };