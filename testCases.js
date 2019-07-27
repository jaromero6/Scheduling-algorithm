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

// Feasible Model. Max capacity per module equal 1. Bosses can conmutate.
// Optimal value 1.
let case7 = {'bosses':[{'id':1, 'name':'H','modules':[1,2,3,30],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[30,12,15,1],'capacity':1},
                             {'id':3, 'name':'J','modules':[1,6,2,3],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[1]},
                                   {'id':2, 'name':'J','modules':[1]},
                                   {'id':3, 'name':'H','modules':[1]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[],'bosses_new_modules':[]}
                    };
// Feasible Model. Order of Bosses is important, optimal value is 2. Capacity per module
// equal 1
let case8 = {'bosses':[{'id':1, 'name':'H','modules':[1,2,3,30],'capacity':1}, 
                             {'id':2, 'name':'A','modules':[30,12,15],'capacity':1},
                             {'id':3, 'name':'J','modules':[1,6],'capacity':1}
                            ],
                    'technicians':[{'id':1, 'name':'H','modules':[1]},
                                   {'id':2, 'name':'J','modules':[2]},
                                   {'id':3, 'name':'H','modules':[3]}
                                ],
                'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
                'technician_new_modules':[],'bosses_new_modules':[]}
                    };

// Feasible Model. Modules 1 and 2 can Conmutate. Capacity per module equal to 1

let case9 = {'bosses':[{'id':1, 'name':'H','modules':[1,2],'capacity':1}, 
                    {'id':2, 'name':'A','modules':[4],'capacity':1},
                    {'id':3, 'name':'J','modules':[6,3],'capacity':1}
                   ],
           'technicians':[{'id':1, 'name':'H','modules':[1]},
                          {'id':2, 'name':'J','modules':[2]},
                          {'id':3, 'name':'H','modules':[5]}
                       ],
       'restrictions':{'technicians_modules':[], 'bosses_modules':[], 
       'technician_new_modules':[],'bosses_new_modules':[]}
           };

// Random Model, big case

let case10 = {'bosses': [{'id': 0, 'name': 'WcbntAu', 'modules': [27, 3, 4, 7, 24, 20], 'capacity': 1}, {'id': 1, 'name': 'HoNIT', 'modules': [6, 24, 3, 10, 8, 0], 'capacity': 3}, {'id': 2, 'name': 'LFCgOVkIu', 'modules': [21, 7, 13, 10, 22], 'capacity': 6}, {'id': 3, 'name': 'cFiXZeOA', 'modules': [16, 9, 17, 5], 'capacity': 2}, {'id': 4, 'name': 'iKsrzCG', 'modules': [7, 9, 21, 14], 'capacity': 5}, {'id': 5, 'name': 'gjlRUb', 'modules': [15, 25, 6, 24, 8], 'capacity': 2}, {'id': 6, 'name': 'LzyaR', 'modules': [8, 26, 25, 11, 6, 18], 'capacity': 1}, {'id': 7, 'name': 'DEJIrMpxUS', 'modules': [25, 1, 17, 13], 'capacity': 3}], 'technicians': [{'id': 0, 'name': 'eYUTSAlmG', 'modules': [6, 22, 13, 9, 7]}, {'id': 1, 'name': 'dFjgr', 'modules': [13, 5, 15, 17]}, {'id': 2, 'name': 'diNzos', 'modules': [15, 5, 11, 16, 0]}, {'id': 3, 'name': 'KpyIn', 'modules': [2, 26, 19, 22]}, {'id': 4, 'name': 'SEtGc', 'modules': [12, 23, 4, 9, 28]}, {'id': 5, 'name': 'SZwx', 'modules': [17, 19, 16, 18]}, {'id': 6, 'name': 'MxanWFZPtl', 'modules': [8, 17, 4, 1]}, {'id': 7, 'name': 'BKYo', 'modules': [2, 18, 21, 6, 25, 19]}, {'id': 8, 'name': 'mDjqG', 'modules': [26, 8, 21, 10, 7]}, {'id': 9, 'name': 'xNDr', 'modules': [14, 22, 24, 16, 2, 4]}, {'id': 10, 'name': 'WrZBxksqg', 'modules': [13, 16, 2, 22, 9, 1]}, {'id': 11, 'name': 'tqwp', 'modules': [19, 22, 1, 9, 0, 26]}, {'id': 12, 'name': 'xrHUl', 'modules': [15, 9, 6, 12]}, {'id': 13, 'name': 'Emcft', 'modules': [20, 9, 7, 22, 17]}, {'id': 14, 'name': 'HrCaPVbL', 'modules': [23, 22, 20, 10, 14, 2]}, {'id': 15, 'name': 'RONrc', 'modules': [2, 8, 23, 17, 13, 28]}, {'id': 16, 'name': 'OrVaE', 'modules': [8, 2, 12, 21, 11]}, {'id': 17, 'name': 'CMUnNtEv', 'modules': [3, 23, 13, 12, 25, 5]}, {'id': 18, 'name': 'iOzDqpvR', 'modules': [22, 12, 1, 2]}, {'id': 19, 'name': 'WXByxPAn', 'modules': [26, 24, 12, 19, 13, 0]}, {'id': 20, 'name': 'PWoAC', 'modules': [4, 23, 7, 13, 19, 24]}, {'id': 21, 'name': 'KUxyX', 'modules': [25, 17, 1, 2, 22, 21]}, {'id': 22, 'name': 'FoBG', 'modules': [10, 0, 3, 12, 27, 18]}, {'id': 23, 'name': 'RMCp', 'modules': [0, 17, 24, 18]}, {'id': 24, 'name': 'cTOWVbw', 'modules': [15, 21, 3, 22, 6, 10]}, {'id': 25, 'name': 'hCKuLHxYs', 'modules': [15, 5, 11, 24, 1, 9]}, {'id': 26, 'name': 'PnaMGm', 'modules': [18, 23, 11, 21, 4]}, {'id': 27, 'name': 'tQeRTxum', 'modules': [17, 9, 28, 2, 21]}, {'id': 28, 'name': 'DyUdgFixc', 'modules': [20, 12, 6, 15, 2]}, {'id': 29, 'name': 'ErMsT', 'modules': [19, 23, 17, 13]}, {'id': 30, 'name': 'zcsouEa', 'modules': [4, 14, 2, 22, 18, 7]}, {'id': 31, 'name': 'nVSkIilReb', 'modules': [16, 1, 21, 27, 11]}, {'id': 32, 'name': 'FDLMPwG', 'modules': [25, 0, 11, 18, 19, 14]}, {'id': 33, 'name': 'dHELMoa', 'modules': [9, 13, 3, 24, 12]}], 'techncians_modules': [], 'bosses_modules': [], 'technician_new_modules': [], 'bosses_new_modules': []};