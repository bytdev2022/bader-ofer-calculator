import React, {Component} from "react";
import "./App.css"

class App extends Component {
    state = {
        partiesResults: [
            {
                "name": 'הליכוד',
                "votes": 1066892,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'יש עתיד',
                "votes": 614112,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'הציונות הדתית',
                "votes": 225641,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'המחנה הממלכתי',
                "votes": 501157,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'יהדות התורה',
                "votes": 248391,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'ש"ס',
                "votes": 316008,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "r"
            },
            {
                "name": 'ישראל ביתנו',
                "votes": 248370,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'העבודה',
                "votes": 268767,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'חד"ש תע"ל',
                "votes": 212583,
                "mandates": 0,
                "moreMandates": 0,
                "next_mandate_votes_per_mandate": 0,
                "side": "l"
            },
            {
                "name": 'מרץ',
                "votes": 202218,
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
                "votes": 273836,
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
        const ALL_MANDATES = 120;
        const BLOCKAGE_THRESHOLD_RATE = 3.25;
        let allVotes = 0;
        for (let i = 0; i < this.state.partiesResults.length; i++) {
            allVotes += this.state.partiesResults[i].votes;
        }
        console.log("allVotes: " + allVotes)

        let blockageThreshold = (allVotes / 100) * BLOCKAGE_THRESHOLD_RATE
        let partiesOverBlockageThreshold = this.state.partiesResults.filter(party => party.votes >= blockageThreshold);
        console.log(partiesOverBlockageThreshold)

        let allCountedVotes = 0;
        for (let i = 0; i < partiesOverBlockageThreshold.length; i++) {
            allCountedVotes += partiesOverBlockageThreshold[i].votes;
        }
        console.log("allCountedVotes: " + allCountedVotes)

        let MandateSurveyor = allCountedVotes / ALL_MANDATES;
        partiesOverBlockageThreshold.forEach(party => {
            party.mandates = parseInt(party.votes / MandateSurveyor);
            console.log("party.mandates: " + party.mandates + ", " + party.name)

            party.next_mandate_votes_per_mandate = party.votes / (party.mandates + 1);

        })
        /*      this.state.partiesResults.forEach(party => {
                  party.mandates = parseInt(party.votes / MandateSurveyor);
                  console.log("party.mandates: " + party.mandates + ", " + party.name)

                  party.next_mandate_votes_per_mandate = party.votes / party.mandates + 1;

              })*/
        let i = 0
        while (this.remainedMandates(partiesOverBlockageThreshold) > 0) {
            console.log("i: " + i)
            i++;
            let partyToAddMandate = partiesOverBlockageThreshold[this.max(partiesOverBlockageThreshold)];
            partyToAddMandate.moreMandates += 1
            partyToAddMandate.next_mandate_votes_per_mandate = partyToAddMandate.votes / (
                partyToAddMandate.mandates + partyToAddMandate.moreMandates + 1)
            partiesOverBlockageThreshold[partyToAddMandate] = partyToAddMandate
            console.log("partyToAddMandate: " + partyToAddMandate.name)
            console.log("partiesOverBlockageThreshold[partyToAddMandate]: " + partiesOverBlockageThreshold[partyToAddMandate].name)

        }

        partiesOverBlockageThreshold.forEach(party => {
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.partiesResults[party.name] = party;
        })
        this.state.partiesResults.sort(function (a, b) {
            return (b.mandates + b.moreMandates) - (a.mandates + a.moreMandates)
        })
        this.setState({
            results: true
        })

    }
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
        return 120 - sum;
    }


    onClear = () => {
        this.state.partiesResults.forEach((party) => {
            party.votes = 0;
            party.mandates = 0;
            party.next_mandate_votes_per_mandate = 0;
            party.moreMandates = 0;

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
    handleMouseEnter = () => {
        this.setState({
            isHovering: true
        })
    };

    handleMouseLeave = () => {
        this.setState({
            isHovering: false
        })
    };

    render() {
        return (
            <div id={"main-container"}>
                <div id={"container-1"}>
                    <h2 style={{fontSize: "3em"}}>מחשבון באדר-עופר</h2>
                    <table>
                        <tr style={{backgroundColor: "rgb(194,238,190)"}}>
                            <th>
                                מפלגה
                            </th>
                            <th className={"border-header"}>
                                קולות
                            </th>
                            <th className={"border-header"}>
                                מנדטים
                            </th>
                            <th className={"border-header"}>
                                מנדטים שנוספו
                            </th>
                            <th className={"border-header"}>
                                סה"כ
                            </th>
                        </tr>
                        {
                            this.state.partiesResults.map((item, i) => {
                                return (
                                    <tr style={{backgroundColor: (i % 2 !== 0) ? "rgba(224, 250, 198, 0.6)" : null}}>
                                        <td style={{
                                            fontWeight: "bold",
                                            backgroundColor: (item.moreMandates > 0) ? "SpringGreen" : null
                                        }}>
                                            {item.name}
                                        </td>
                                        <td className={"border-data"}>
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
                                        <td className={"border-data"}>
                                            {item.mandates}
                                        </td>
                                        <td className={"border-data"}>
                                            {item.moreMandates}
                                        </td>
                                        <td className={"border-data"}
                                            style={{fontWeight: "bold", backgroundColor: (item.moreMandates > 0) ? "SpringGreen" : null}}>
                                            {item.moreMandates + item.mandates}
                                        </td>
                                    </tr>
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
