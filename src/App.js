import React, {Component} from "react";
import "./App.css";
import gitImage from './images/git.png';
import linkedinImage from './images/linkedin.png';

const ALL_MANDATES = 120;
const BLOCKAGE_THRESHOLD_RATE = 3.25;
const groups = [
    {
        "names": ['הליכוד', 'הציונות הדתית'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['יש עתיד', 'המחנה הממלכתי'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['יהדות התורה', 'ש"ס'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['העבודה', 'מרץ'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['ישראל ביתנו'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['חד"ש תע"ל'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['רע"מ'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['בל"ד'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    },
    {
        "names": ['הבית היהודי'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0
    }
];

class App extends Component {
    state = {
        partiesResults: [
            {
                "name": 'הליכוד',
                "votes": 1106892,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'יש עתיד',
                "votes": 804112,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'הציונות הדתית',
                "votes": 485641,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'המחנה הממלכתי',
                "votes": 481641,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'יהדות התורה',
                "votes": 258391,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'ש"ס',
                "votes": 326008,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'ישראל ביתנו',
                "votes": 208370,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'העבודה',
                "votes": 191767,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'חד"ש תע"ל',
                "votes": 182583,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'מרץ',
                "votes": 192218,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'רע"מ',
                "votes": 167064,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'בל"ד',
                "votes": 50000,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'הבית היהודי',
                "votes": 40000,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
        ],
        results: false,
    }

    calculate = () => {
        this.state.partiesResults.forEach((party) => {
            party.mandates = 0;
            party.next_mandate_votes_per_mandate = 0;
            party.moreMandates = 0;
        })
        groups.forEach((group) => {
            group.mandates = 0;
            group.next_mandate_votes_per_mandate = 0;
            group.moreMandates = 0;
        })
        let allVotes = 0;
        for (let i = 0; i < this.state.partiesResults.length; i++) {
            allVotes += this.state.partiesResults[i].votes;
        }
        let blockageThreshold = (allVotes / 100) * BLOCKAGE_THRESHOLD_RATE
        let partiesOverBlockageThreshold = this.state.partiesResults.filter(party => party.votes >= blockageThreshold);
        let allCountedVotes = 0;
        for (let i = 0; i < partiesOverBlockageThreshold.length; i++) {
            allCountedVotes += partiesOverBlockageThreshold[i].votes;
        }
        let MandateSurveyor = allCountedVotes / ALL_MANDATES;
        partiesOverBlockageThreshold.forEach(party => {
            party.mandates = Math.floor(party.votes / MandateSurveyor);
            party.next_mandate_votes_per_mandate = party.votes / (party.mandates + 1);
        })

        this.updateGroupsFromParties(partiesOverBlockageThreshold);
        while (this.remainedMandates(groups) > 0) {
            let groupIndexToAddMandate = this.max(groups);
            groups[groupIndexToAddMandate].moreMandates += 1;
            groups[groupIndexToAddMandate].next_mandate_votes_per_mandate = groups[groupIndexToAddMandate].votes / (
                groups[groupIndexToAddMandate].mandates + groups[groupIndexToAddMandate].moreMandates + 1)
        }
        console.log(groups)
        for (let i = 0; i < groups.length; i++) {
            let groupMandates = groups[i].mandates + groups[i].moreMandates;
            let votesPerMandate = groups[i].votes / groupMandates;
            for (let j = 0; j < groups[i].names.length; j++) {
                let partyIndex = partiesOverBlockageThreshold.findIndex(party => party.name === groups[i].names[j])
                if (partyIndex >= 0) {
                    if (partiesOverBlockageThreshold[partyIndex].mandates < Math.floor(partiesOverBlockageThreshold[partyIndex].votes / votesPerMandate)) {
                        partiesOverBlockageThreshold[partyIndex].moreMandates += 1;
                    }
                    partiesOverBlockageThreshold[partyIndex].next_mandate_votes_per_mandate = partiesOverBlockageThreshold[partyIndex].votes / (partiesOverBlockageThreshold[partyIndex].mandates + partiesOverBlockageThreshold[partyIndex].moreMandates + 1);
                }
            }
            let groupParties = partiesOverBlockageThreshold.filter((party) => groups[i].names.includes(party.name))
            let groupPartiesMandates = this.sumOfPropertyInObjectsArray(groupParties, ["mandates"]) + this.sumOfPropertyInObjectsArray(groupParties, ["moreMandates"])
            if (groupPartiesMandates < groupMandates) {
                let partyNameToAddMandate = groupParties[this.max(groupParties)].name;
                let partyIndex = partiesOverBlockageThreshold.findIndex(party => party.name === partyNameToAddMandate)
                partiesOverBlockageThreshold[partyIndex]["moreMandates"] += 1
            }
        }
        this.state.partiesResults.sort(function (a, b) {
            return (b.mandates + b.moreMandates) - (a.mandates + a.moreMandates)
        })
        this.setState({
            results: true
        })
    }

    updateGroupsFromParties = (partiesOverBlockageThreshold) => {
        for (let i = 0; i < groups.length; i++) {
            let group = partiesOverBlockageThreshold.filter((party) => groups[i]["names"].includes(party["name"]))
            groups[i]["votes"] = this.sumOfPropertyInObjectsArray(group, ["votes"])
            groups[i]["mandates"] = this.sumOfPropertyInObjectsArray(group, ["mandates"])
            groups[i]["next_mandate_votes_per_mandate"] = groups[i].votes / (groups[i].mandates + 1)
        }
    }

    sumOfPropertyInObjectsArray = (arrayOfObjects, props) => {
        let sum = 0;
        arrayOfObjects.forEach(obj => {
            props.forEach(prop => {
                sum += obj[prop]
            })
        })
        return sum
    }

    max = (groups) => {
        let index = 0;
        let max = 0;
        for (let i = 0; i < groups.length; i++) {
            if (max < groups[i].next_mandate_votes_per_mandate) {
                max = groups[i].next_mandate_votes_per_mandate;
                index = i;
            }
        }
        return index;
    }

    remainedMandates = (groups) => {
        let sum = 0;
        for (let i = 0; i < groups.length; i++) {
            sum += (groups[i].mandates + groups[i].moreMandates);
        }
        return (ALL_MANDATES - sum);
    }

    onClear = () => {
        this.state.partiesResults.forEach((party) => {
            party.votes = 0;
            party.mandates = 0;
            party.next_mandate_votes_per_mandate = 0;
            party.moreMandates = 0;
            party.distance = 0;

        })
        this.setState({
            results: false
        })
    }

    enableCalculate = () => {
        return !this.state.partiesResults.every(party => party.votes > 0);
    }

    enableClear = () => {
        return !this.state.partiesResults.some(party => party.votes > 0);
    }

    sumBlock = (side) => {
        let block = this.state.partiesResults.filter(party => party.side === side);
        let sum = 0;
        for (let i = 0; i < block.length; i++) {
            sum += (block[i].mandates + block[i].moreMandates);
        }
        return sum;
    }

    sortByMandates = () => {
        this.state.partiesResults.sort(function (a, b) {
            return (b.mandates - a.mandates)
        })
        this.setState({});
    }

    sortByVotes = () => {
        this.state.partiesResults.sort(function (a, b) {
            return (b.votes - a.votes)
        })
        this.setState({});
    }

    sortBySum = () => {
        this.state.partiesResults.sort(function (a, b) {
            return (b.mandates + b.moreMandates) - (a.mandates + a.moreMandates)
        })
        this.setState({});
    }

    render() {
        return (
            <div id={"main-container"}>
                <div id={"container-1"}>
                    <h2 id={"header"}>מחשבון באדר-עופר</h2>
                    <table>
                        <thead>
                        <tr id={"table-row-header"}>
                            <th>
                                מפלגה
                            </th>
                            <th onClick={this.sortByVotes} className={"border-header border-header-sort"}>
                                 קולות &#8595;
                            </th>
                            <th onClick={this.sortByMandates} className={"border-header border-header-sort"}>
                                 לפני באדר עופר &#8595;
                            </th>
                            <th onClick={this.sortBySum} className={"border-header border-header-sort"}>
                                סה"כ &#8595;
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.partiesResults.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{
                                            fontWeight: "bold",
                                            backgroundColor: (item.moreMandates > 0) ? "SpringGreen" : null
                                        }}>
                                            {item.name}
                                        </td>
                                        <td>
                                            <input
                                                type={"number"}
                                                onChange={(e) => {
                                                    let newPartiesResults = this.state.partiesResults;
                                                    newPartiesResults[i].votes = parseInt(e.target.value);
                                                    this.setState({
                                                        partiesResults: newPartiesResults
                                                    })
                                                }
                                                }
                                                value={item.votes}
                                            />
                                        </td>
                                        <td>
                                            {item.mandates}
                                        </td>
                                        <td style={{
                                            fontWeight: "bold",
                                            backgroundColor: (item.moreMandates > 0) ? "SpringGreen" : null
                                        }}>
                                            {item.moreMandates + item.mandates}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div id={"container-2"}>
                    {
                        this.state.results &&
                        <div>
                            <h2 className={"block"}>
                                גוש הימין: {this.sumBlock("r")}
                            </h2>
                        </div>
                    }
                    <div style={{marginTop: "6px", marginRight: "30px", marginLeft: "30px"}}>
                        <button style={{}} disabled={this.enableCalculate()} onClick={this.calculate}>חשב</button>
                        <button style={{}} disabled={this.enableClear()} onClick={this.onClear}>נקה הכל</button>
                    </div>
                    {
                        this.state.results &&
                        <div>
                            <h2 className={"block"}>
                                גוש השמאל: {this.sumBlock("l")}
                            </h2>
                        </div>
                    }
                </div>
                <div id={"footer"}>
                    <footer>
                        <div style={{textShadow: "0 0 10px #a8e38a"}}>
                            © 2022 Developed by BYT Dev <br/><p>The creators of <a id={"wordle-link"} href={"https://hebrewordle.netlify.app/"} rel={"noreferrer noopener"} target={"_blank"}> Hebrew Wordle</a></p>
                            <div id={"links"}>
                                <a className={"images"} rel={"noreferrer noopener"} target={"_blank"}
                                   href={"https://github.com/bytdev2022/bader-ofer-calculator"}>
                                    <img src={gitImage} alt={"git"}/>
                                </a>
                                <a className={"images"} rel={"noreferrer noopener"} target={"_blank"}
                                   href={"https://www.linkedin.com/in/yitzhak-amsalem/"}>
                                    <img
                                        src={linkedinImage} alt={"linkedin"}/>
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );

    }

}

export default App;
