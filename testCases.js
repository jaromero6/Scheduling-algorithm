// Infeasible model
case1 = {'bosses':[{'id':1, 'name':'H','modules':[1,2,3],'capacity':1}, 
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

// Feasible model, without restrictions, Optimal value = 2
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
// Capacity per module equal 3
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

// Random Model, big cas
let case10 = {'bosses': [{'id': 0, 'name': 'jfwq', 'modules': [17, 23, 20, 2], 'capacity': 6}, {'id': 1, 'name': 'jVlWdxDUe', 'modules': [0, 11, 19, 1], 'capacity': 4}, {'id': 2, 'name': 'hJRnTbzUv', 'modules': [24, 2, 11, 16, 6, 12], 'capacity': 5}, {'id': 3, 'name': 'yGltWZFDm', 'modules': [5, 17, 9, 3, 24], 'capacity': 3}, {'id': 4, 'name': 'nQCehg', 'modules': [13, 8, 1, 5], 'capacity': 5}, {'id': 5, 'name': 'ZbESLQc', 'modules': [12, 20, 24, 15, 28, 21], 'capacity': 2}, {'id': 6, 'name': 'gNaGUHdcJ', 'modules': [21, 22, 5, 10, 0], 'capacity': 4}], 'technicians': [{'id': 0, 'name': 'LhIRpXk', 'modules': [3, 24, 6, 5]}, {'id': 1, 'name': 'klQrOyC', 'modules': [11, 10, 16, 9]}, {'id': 2, 'name': 'dmrA', 'modules': [27, 19, 14, 3, 12]}, {'id': 3, 'name': 'DQiv', 'modules': [6, 3, 19, 24, 8, 20]}, {'id': 4, 'name': 'huDJS', 'modules': [23, 28, 14, 8, 27]}, {'id': 5, 'name': 'encaCXfA', 'modules': [25, 21, 16, 17, 19]}, {'id': 6, 'name': 'LmCMtQI', 'modules': [15, 10, 17, 25, 26, 12]}, {'id': 7, 'name': 'BSUoG', 'modules': [10, 24, 1, 16, 25, 2]}, {'id': 8, 'name': 'EQuAXm', 'modules': [18, 7, 6, 14]}, {'id': 9, 'name': 'FJsg', 'modules': [6, 13, 16, 14, 5, 15]}, {'id': 10, 'name': 'fKGxNm', 'modules': [3, 0, 5, 18, 2]}, {'id': 11, 'name': 'hTrJXdN', 'modules': [20, 0, 23, 3, 1]}, {'id': 12, 'name': 'fPbnjRA', 'modules': [16, 14, 17, 20, 22]}, {'id': 13, 'name': 'imBITJahuG', 'modules': [25, 15, 10, 27, 26]}, {'id': 14, 'name': 'ZtTdEGX', 'modules': [11, 3, 2, 16, 6]}, {'id': 15, 'name': 'zhHCvEMsa', 'modules': [8, 6, 25, 14, 5, 19]}, {'id': 16, 'name': 'npKrSAezj', 'modules': [19, 4, 15, 7]}, {'id': 17, 'name': 'AUDXH', 'modules': [12, 24, 11, 23, 25]}, {'id': 18, 'name': 'jmlPDcMoAh', 'modules': [11, 6, 17, 28, 19]}, {'id': 19, 'name': 'YtPbOkcp', 'modules': [22, 17, 6, 7]}, {'id': 20, 'name': 'VpUaKrgc', 'modules': [23, 12, 22, 7, 26, 18]}, {'id': 21, 'name': 'TSzibqRkK', 'modules': [14, 16, 5, 21]}, {'id': 22, 'name': 'krSLhdfVMp', 'modules': [18, 5, 4, 26, 24, 15]}, {'id': 23, 'name': 'MNoj', 'modules': [14, 19, 5, 2, 8, 0]}, {'id': 24, 'name': 'JxUmo', 'modules': [4, 26, 18, 7, 19]}, {'id': 25, 'name': 'cOmyn', 'modules': [5, 13, 22, 12]}, {'id': 26, 'name': 'Oihl', 'modules': [7, 8, 21, 10, 4]}, {'id': 27, 'name': 'UzNabRH', 'modules': [5, 15, 3, 17, 4]}, {'id': 28, 'name': 'hQweM', 'modules': [3, 14, 12, 24, 15, 27]}, {'id': 29, 'name': 'GCZko', 'modules': [19, 28, 11, 26]}, {'id': 30, 'name': 'GagyqI', 'modules': [6, 28, 20, 23]}, {'id': 31, 'name': 'cMPDFRsVq', 'modules': [27, 16, 12, 26]}, {'id': 32, 'name': 'NKjQtHd', 'modules': [2, 9, 7, 19, 16]}], 'restrictions': {'technicians_modules': [], 'bosses_modules': [], 'technician_new_modules': [], 'bosses_new_modules': []}};
let case11 = {'bosses': [{'id': 0, 'name': 'XLplxkVgE', 'modules': [20, 18, 7, 8, 9], 'capacity': 2}, {'id': 1, 'name': 'uFEz', 'modules': [23, 14, 11, 16, 28], 'capacity': 2}, {'id': 2, 'name': 'Asef', 'modules': [27, 19, 4, 18, 11], 'capacity': 1}, {'id': 3, 'name': 'FnsOWCAvtR', 'modules': [19, 24, 16, 3, 20], 'capacity': 1}, {'id': 4, 'name': 'nVOzIZM', 'modules': [14, 24, 26, 5, 18, 16], 'capacity': 4}, {'id': 5, 'name': 'dHfjsyWu', 'modules': [9, 10, 4, 3], 'capacity': 3}], 'technicians': [{'id': 0, 'name': 'vmxoT', 'modules': [17, 14, 3, 28]}, {'id': 1, 'name': 'GYVMS', 'modules': [24, 11, 10, 18, 13, 2]}, {'id': 2, 'name': 'QXmupdYqDa', 'modules': [27, 16, 2, 12]}, {'id': 3, 'name': 'YoFbrOsB', 'modules': [23, 26, 15, 8, 24, 5]}, {'id': 4, 'name': 'bIrkZwoLf', 'modules': [26, 16, 17, 18]}, {'id': 5, 'name': 'TWSMR', 'modules': [21, 24, 18, 9]}, {'id': 6, 'name': 'kqJzfAMHCW', 'modules': [22, 27, 26, 0, 24]}, {'id': 7, 'name': 'ACLGB', 'modules': [9, 8, 14, 13, 10]}, {'id': 8, 'name': 'CeVrpI', 'modules': [20, 16, 5, 25, 12]}, {'id': 9, 'name': 'kVYX', 'modules': [7, 10, 27, 16, 0]}, {'id': 10, 'name': 'cCMuWN', 'modules': [19, 16, 13, 18, 23]}, {'id': 11, 'name': 'VKgurOwX', 'modules': [26, 21, 16, 18, 8]}, {'id': 12, 'name': 'rwgBXN', 'modules': [4, 15, 10, 13]}, {'id': 13, 'name': 'eEyLoFPlj', 'modules': [14, 9, 26, 27, 25]}, {'id': 14, 'name': 'RgCyAtxu', 'modules': [6, 9, 23, 15]}, {'id': 15, 'name': 'enjatHoyBA', 'modules': [20, 12, 16, 10, 0, 4]}, {'id': 16, 'name': 'GXSZ', 'modules': [27, 18, 6, 17, 21]}, {'id': 17, 'name': 'VvfjoNK', 'modules': [3, 22, 19, 15, 7, 18]}, {'id': 18, 'name': 'pAFl', 'modules': [18, 4, 9, 1, 15, 12]}, {'id': 19, 'name': 'HFIrJ', 'modules': [17, 4, 8, 11, 15, 2]}, {'id': 20, 'name': 'AGHiKlky', 'modules': [21, 28, 7, 26]}, {'id': 21, 'name': 'uFqRVXZMA', 'modules': [19, 15, 20, 10, 21, 2]}, {'id': 22, 'name': 'WzgOipwqAj', 'modules': [3, 8, 27, 21, 13]}, {'id': 23, 'name': 'hxTuodQXR', 'modules': [20, 8, 5, 22, 12, 1]}, {'id': 24, 'name': 'bqAsyu', 'modules': [20, 19, 13, 22, 12, 0]}, {'id': 25, 'name': 'nNxpRgh', 'modules': [22, 0, 1, 27, 24]}, {'id': 26, 'name': 'pscCBWMbt', 'modules': [5, 28, 20, 2, 12]}, {'id': 27, 'name': 'mHSxB', 'modules': [17, 24, 14, 8, 16, 27]}, {'id': 28, 'name': 'HwsLVJD', 'modules': [12, 20, 9, 25, 14]}, {'id': 29, 'name': 'gcKRGrCI', 'modules': [1, 13, 15, 28, 2, 6]}, {'id': 30, 'name': 'KimFqRkxTW', 'modules': [18, 22, 28, 10, 2]}, {'id': 31, 'name': 'izpBmIa', 'modules': [10, 4, 1, 16]}, {'id': 32, 'name': 'QPVDnyruW', 'modules': [5, 26, 25, 9, 16, 22]}, {'id': 33, 'name': 'ohKGn', 'modules': [10, 22, 8, 28, 13]}, {'id': 34, 'name': 'tGRjVzPNfh', 'modules': [4, 25, 19, 16, 26, 9]}, {'id': 35, 'name': 'bdremFtG', 'modules': [15, 3, 17, 16, 5, 28]}, {'id': 36, 'name': 'KBLCh', 'modules': [7, 0, 8, 9, 28]}, {'id': 37, 'name': 'UGQlps', 'modules': [2, 17, 24, 8, 18]}, {'id': 38, 'name': 'WPhbDque', 'modules': [8, 17, 7, 10]}, {'id': 39, 'name': 'wQCsMdRe', 'modules': [12, 16, 18, 19, 23]}, {'id': 40, 'name': 'vjptaOC', 'modules': [26, 22, 10, 21, 0, 11]}], 'restrictions': {'technicians_modules': [], 'bosses_modules': [], 'technician_new_modules': [], 'bosses_new_modules': []}};

exports.case = case10;