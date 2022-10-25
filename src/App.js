import React, {Component} from "react";
import "./App.css";

const ALL_MANDATES = 120;
const BLOCKAGE_THRESHOLD_RATE = 3.25;

class App extends Component {
    state = {
        partiesResults: [
            {
                "name": 'הליכוד',
                "votes": 1066892,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'יש עתיד',
                "votes": 614112,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'הציונות הדתית',
                "votes": 225641,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'המחנה הממלכתי',
                "votes": 501157,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'יהדות התורה',
                "votes": 248391,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'ש"ס',
                "votes": 316008,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'ישראל ביתנו',
                "votes": 248370,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'העבודה',
                "votes": 268767,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'חד"ש תע"ל',
                "votes": 212583,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'מרץ',
                "votes": 202218,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'רע"מ',
                "votes": 167064,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'בל"ד',
                "votes": 50000,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'הבית היהודי',
                "votes": 273836,
                "distance": 0,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
        ],
        results: false,
        isHovering: false
    }
    calculate = () => {
        this.state.partiesResults.forEach((party) => {
            party.mandates = 0;
            party.next_mandate_votes_per_mandate = 0;
            party.moreMandates = 0;

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
            party.mandates = parseInt((party.votes / MandateSurveyor).toString());
            party.next_mandate_votes_per_mandate = party.votes / (party.mandates + 1);

        })

        while (this.remainedMandates(partiesOverBlockageThreshold) > 0) {
            let partyToAddMandate = partiesOverBlockageThreshold[this.max(partiesOverBlockageThreshold)];
            partyToAddMandate.moreMandates += 1
            partyToAddMandate.next_mandate_votes_per_mandate = partyToAddMandate.votes / (
                partyToAddMandate.mandates + partyToAddMandate.moreMandates + 1)
            partiesOverBlockageThreshold[partyToAddMandate] = partyToAddMandate
        }
        this.state.partiesResults.sort(function (a, b) {
            return (b.mandates + b.moreMandates) - (a.mandates + a.moreMandates)
        })
        this.setState({
            results: true
        })

    }
    /*    roundAvoid = (val, places) => {
            let scale = Math.pow(10, places);
            return Math.round(val * scale) / scale;
        }*/
    max = (partiesOverBlockageThreshold) => {
        let index = 0;
        let max = 0;
        for (let i = 0; i < partiesOverBlockageThreshold.length; i++) {
            if (max < partiesOverBlockageThreshold[i].next_mandate_votes_per_mandate) {
                max = partiesOverBlockageThreshold[i].next_mandate_votes_per_mandate;
                index = i;
            }
        }
        return index;
    }
    remainedMandates = (partiesOverBlockageThreshold) => {
        let sum = 0;
        for (let i = 0; i < partiesOverBlockageThreshold.length; i++) {
            sum += (partiesOverBlockageThreshold[i].mandates + partiesOverBlockageThreshold[i].moreMandates);
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
                            <th className={"border-header"}>
                                קולות
                            </th>
                            <th className={"border-header"}>
                                מרחק
                            </th>
                            <th className={"border-header"}>
                                לפני באדר עופר
                            </th>
                            <th className={"border-header"}>
                                סה"כ
                            </th>
                        </tr>
                        </thead>
                        {
                            this.state.partiesResults.map((item, i) => {
                                return (
                                    <tbody key={i}>
                                    <tr>
                                        <td style={{fontWeight: "bold", backgroundColor: (item.moreMandates > 0) ? "SpringGreen" : null}}>
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
                                            {item.distance}
                                        </td>
                                        <td>
                                            {item.mandates}
                                        </td>
                                        <td style={{fontWeight: "bold", backgroundColor: (item.moreMandates > 0) ? "SpringGreen" : null}}>
                                            {item.moreMandates + item.mandates}
                                        </td>
                                    </tr>
                                    </tbody>
                                )
                            })
                        }

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
            </div>
        );

    }

}

export default App;
