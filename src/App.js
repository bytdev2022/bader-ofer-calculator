import React, {Component} from "react";
import "./App.css";
import gitImage from './images/git.png';
import linkedinImage from './images/linkedin.png';

const ALL_MANDATES = 120;
const BLOCKAGE_THRESHOLD_RATE = 3.25;
let groups = [
    {
        "names": ['הליכוד', 'הציונות הדתית'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['יש עתיד', 'המחנה הממלכתי'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['יהדות התורה', 'ש"ס'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['העבודה', 'מרץ'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['ישראל ביתנו'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['חד"ש תע"ל'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['רע"מ'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['בל"ד'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    },
    {
        "names": ['הבית היהודי'],
        "votes": 0,
        "mandates": 0,
        "moreMandates": 0,
        "next_mandate_votes_per_mandate": 0,
        "rate": []
    }
];

class App extends Component {
    state = {
        partiesResults: [
            {
                "name": 'הליכוד',
                "votes": 1115049,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'יש עתיד',
                "votes": 847145,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'הציונות הדתית',
                "votes": 516146,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'המחנה הממלכתי',
                "votes": 432376,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'ש"ס',
                "votes": 392644,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'יהדות התורה',
                "votes": 280125,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'ישראל ביתנו',
                "votes": 213655,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'רע"מ',
                "votes": 193916,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'חד"ש תע"ל',
                "votes": 178661,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'העבודה',
                "votes": 175922,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'מרץ',
                "votes": 145000,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'בל"ד',
                "votes": 138000,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'הבית היהודי',
                "votes": 56000,
                "rate": [],
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
        ],
        distributionMandates: ""
    }

    calculate = () => {
        groups = [
            {
                "names": ['הליכוד', 'הציונות הדתית'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['יש עתיד', 'המחנה הממלכתי'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['יהדות התורה', 'ש"ס'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['העבודה', 'מרץ'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['ישראל ביתנו'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['חד"ש תע"ל'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['רע"מ'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['בל"ד'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            },
            {
                "names": ['הבית היהודי'],
                "votes": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "rate": []
            }
        ];
        this.state.partiesResults.forEach((party) => {
            party.mandates = 0;
            party.next_mandate_votes_per_mandate = 0;
            party.moreMandates = 0;
            party.rate = []
        })
        groups.forEach((group) => {
            group.votes = 0;
            group.mandates = 0;
            group.next_mandate_votes_per_mandate = 0;
            group.moreMandates = 0;
            group.rate = []
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
        let updateDistributionMandates = this.remainedMandates(partiesOverBlockageThreshold);
        let rate = 1;
        while (this.remainedMandates(groups) > 0) {
            let groupIndexToAddMandate = this.max(groups);
            groups[groupIndexToAddMandate].rate.push(rate);
            rate++;
            console.log(groups[groupIndexToAddMandate].names[0] + ": " + groups[groupIndexToAddMandate].rate);
            groups[groupIndexToAddMandate].moreMandates += 1;
            groups[groupIndexToAddMandate].next_mandate_votes_per_mandate = groups[groupIndexToAddMandate].votes / (
                groups[groupIndexToAddMandate].mandates + groups[groupIndexToAddMandate].moreMandates + 1);
        }

        let leftGroups = groups.filter(() => {
            return true
        });

        while (leftGroups.length > 0) {
            let groupToRate = this.maxGroup(leftGroups);
            let i = leftGroups.indexOf(groupToRate)
            if (groupToRate.votes > 0) {
                let j = groups.indexOf(groupToRate);
                groups[j].rate.push(rate)
                rate++;
            }
            leftGroups.splice(i, 1);
        }

        let partyWithoutAgreement = groups.filter(group => group.names.length === 1)
        partyWithoutAgreement.forEach(group => {
            let index = partiesOverBlockageThreshold.findIndex(party => party.name === group.names[0])
            if (index >= 0) {
                partiesOverBlockageThreshold[index].rate = group.rate;
            }
        })

        for (let i = 0; i < groups.length; i++) {
            let groupMandates = groups[i].mandates + groups[i].moreMandates;
            let votesPerMandate = groups[i].votes / groupMandates;
            for (let j = 0; j < groups[i].names.length; j++) {
                let partyIndex = partiesOverBlockageThreshold.findIndex(party => party.name === groups[i].names[j])
                if (partyIndex >= 0) {
                    if (partiesOverBlockageThreshold[partyIndex].mandates < Math.floor(partiesOverBlockageThreshold[partyIndex].votes / votesPerMandate)) {
                        partiesOverBlockageThreshold[partyIndex].moreMandates += 1;
                        partiesOverBlockageThreshold[partyIndex].rate.push(groups[i].rate.shift());
                    }
                    partiesOverBlockageThreshold[partyIndex].next_mandate_votes_per_mandate = partiesOverBlockageThreshold[partyIndex].votes / (partiesOverBlockageThreshold[partyIndex].mandates
                        + partiesOverBlockageThreshold[partyIndex].moreMandates + 1);
                }
            }
            let groupParties = partiesOverBlockageThreshold.filter(party => groups[i].names.includes(party.name))
            let groupPartiesMandates = this.sumOfPropertyInObjectsArray(groupParties, ["mandates"]) + this.sumOfPropertyInObjectsArray(groupParties, ["moreMandates"])
            if (groupParties.length > 1) {
                while (groups[i].rate.length > 0) {
                    let partyNameToAddMandate = groupParties[this.max(groupParties)].name;
                    let partyIndex = partiesOverBlockageThreshold.findIndex(party => party.name === partyNameToAddMandate);
                    partiesOverBlockageThreshold[partyIndex].rate.push(groups[i].rate.shift());
                    if (groupPartiesMandates < groupMandates) {
                        partiesOverBlockageThreshold[partyIndex].moreMandates += 1;
                        groupPartiesMandates++;
                    }
                }
            }
        }
        partiesOverBlockageThreshold.forEach(party => {
            if (party.rate.length === 0) {
                party.rate.push(rate)
            }
            party.rate.sort(function (a, b) {
                return a - b;
            })
        })
        this.state.partiesResults.sort(function (a, b) {
            return (b.mandates + b.moreMandates) - (a.mandates + a.moreMandates)
        })
        this.setState({
            distributionMandates: updateDistributionMandates
        })
    }

    updateGroupsFromParties = (partiesOverBlockageThreshold) => {
        groups.forEach(group => {
            let party = partiesOverBlockageThreshold.filter((party) => group.names.includes(party.name));
            group.votes = this.sumOfPropertyInObjectsArray(party, ["votes"]);
            group.mandates = this.sumOfPropertyInObjectsArray(party, ["mandates"]);
            group.next_mandate_votes_per_mandate = group.votes / (group.mandates + 1);
        })
        groups.forEach(group => {
            group.names.forEach(name => {
                let included = partiesOverBlockageThreshold.some(party => party.name === name);
                if (!included) {
                    let index = group.names.indexOf(name)
                    group.names.splice(index, 1);
                }
            })
        })
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

    maxGroup = (groups) => {
        let index = 0;
        let max = 0;
        for (let i = 0; i < groups.length; i++) {
            if (max < groups[i].next_mandate_votes_per_mandate) {
                max = groups[i].next_mandate_votes_per_mandate;
                index = i;
            }
        }
        return groups[index];
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
            party.rate = [];
        })
        groups.forEach((group) => {
            group.mandates = 0;
            group.next_mandate_votes_per_mandate = 0;
            group.moreMandates = 0;
            group.rate = [];
        })
        this.setState({
            distributionMandates: ""
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

    sortByRate = () => {
        this.state.partiesResults.sort(function (a, b) {
            return ((a.rate[0]) - (b.rate[0]))
        })
        this.setState({});
    }

    sortByName = () => {
        this.state.partiesResults.sort((a, b) => a.name.localeCompare(b.name))
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
                            <th onClick={this.sortByName} className={"border-header border-header-sort"}>
                                מפלגה &#8595;
                            </th>
                            <th onClick={this.sortByVotes} className={"border-header border-header-sort"}>
                                קולות &#8595;
                            </th>
                            <th onClick={this.sortByMandates} className={"border-header border-header-sort"}>
                                לפני באדר עופר &#8595;
                            </th>
{/*                            <th onClick={this.sortByMandates} className={"border-header border-header-sort"}>
                                ממוצע למנדט &#8595;
                            </th>*/}
                            <th onClick={this.sortByRate} className={"border-header border-header-sort"}>
                                דירוג {this.state.distributionMandates} מנדטים לחלוקה &#8595;
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
                                            backgroundColor: (item.moreMandates > 0) ? "#00fa9a" : null
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
         {/*                               <td style={{
                                            fontSize: "1.3em",
                                            fontWeight: "bold"
                                        }}>
                                            {groups[groups.findIndex(group => group.names.includes(item.name))].next_mandate_votes_per_mandate > 0 &&
                                                groups[groups.findIndex(group => group.names.includes(item.name))].next_mandate_votes_per_mandate}
                                        </td>*/}
                                        <td style={{
                                            color: item.rate[0] > 0 && item.rate[0] <= this.state.distributionMandates ? "#00d523"
                                                :
                                                item.rate[0] > this.state.distributionMandates && item.rate[0] <= this.state.distributionMandates + 2 && "#0145c5",
                                            fontSize: "1.2em",
                                            fontWeight: "bold"
                                        }}>
                                            {(item.rate.length === 1 && item.rate <= this.state.distributionMandates + 2) ? item.rate[0] : item.rate.map((rate, i) => {
                                                return (<span style={{
                                                    color: rate > 0 && rate <= this.state.distributionMandates ? "#00d523"
                                                        :
                                                        rate > this.state.distributionMandates && rate <= this.state.distributionMandates + 2 && "#0145c5"
                                                }}>{rate <= this.state.distributionMandates + 2 && rate} {(item.rate[i + 1] <= this.state.distributionMandates + 2) &&
                                                    <span style={{color: "rgba(82,87,82,0.94)"}}> , </span>}</span>)
                                            })}
                                            {((item.rate.length === 0) || (item.rate[0] > (this.state.distributionMandates + 2))) ?
                                            <span style={{color: "black"}}>-</span> : ""}
                                        </td>
                                        <td style={{
                                            fontSize: "1.3em",
                                            fontWeight: "bold"
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
                        this.sumBlock("r") > 0 &&
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
                        this.sumBlock("l") > 0 &&
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
                            © 2022 Developed by BYT Dev <br/><p>The creators of <a id={"wordle-link"}
                                                                                   href={"https://hebrewordle.netlify.app/"}
                                                                                   rel={"noreferrer noopener"}
                                                                                   target={"_blank"}> Hebrew Wordle</a>
                        </p>
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
