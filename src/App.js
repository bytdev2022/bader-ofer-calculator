import React, {Component} from "react";
import "./App.css"
class App extends Component {
  state = {
      partiesResults: [
          {"name": 'הליכוד', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'יש עתיד', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'הציונות הדתית', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'המחנה הממלכתי', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'יהדות התורה', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'ש"ס', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'ישראל ביתנו', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'העבודה', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'חד"ש תע"ל', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'מרץ', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'רע"מ', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'בל"ד', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'הבית היהודי', "votes": 0, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
      ],
      results: false
  }


  calculate = () => {
      const ALL_MANDATES = 120;
      const BLOCKAGE_THRESHOLD_RATE = 3.25;
      let allVotes = 0;
      for (let i = 0; i < this.state.partiesResults.length; i++){
          allVotes += this.state.partiesResults[i].votes;
      }
      console.log("allVotes: " + allVotes)

      let blockageThreshold = (allVotes / 100) * BLOCKAGE_THRESHOLD_RATE
      let partiesOverBlockageThreshold = this.state.partiesResults.filter(party => party.votes > blockageThreshold);
      let allCountedVotes = 0;
      for (let i = 0; i < partiesOverBlockageThreshold.length; i++){
          allCountedVotes += partiesOverBlockageThreshold[i].votes;
      }
      let MandateSurveyor = allCountedVotes / ALL_MANDATES;
      this.state.partiesResults.forEach(party => {
          party.mandates = parseInt(party.votes / MandateSurveyor);
          console.log("party.mandates: " + party.mandates + ", " + party.name)

          party.next_mandate_votes_per_mandate = party["votes"] / party["mandates"] + 1;

      })

      while (this.remainedMandates() > 0){
          let i = 0
          console.log("i: " + i)
          i++;
          let partyToAddMandate = this.state.partiesResults[this.max()];
          partyToAddMandate["moreMandates"] += 1
          partyToAddMandate["next_mandate_votes_per_mandate"] = partyToAddMandate["votes"] / (
              partyToAddMandate["mandates"] + partyToAddMandate["moreMandates"] + 1)
      }


      this.setState({
          results: true
      })

  }
    max = () => {
        let index = 0;
        let max = 0;
        for (let i = 0; i < this.state.partiesResults.length; i++){
            if (max < this.state.partiesResults.next_mandate_votes_per_mandate){
                max = this.state.partiesResults.next_mandate_votes_per_mandate;
                index = i;
            }
        }
        return index;
    }
  remainedMandates = () => {
      let sum = 0;
      for (let i = 0; i < this.state.partiesResults.length; i++){
          sum += this.state.partiesResults[i].mandates += this.state.partiesResults[i].moreMandates;
      }
      return 120 - sum;
  }


  onClear = () => {
      this.state.partiesResults.forEach(party => party.votes = 0)
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
      for (let i = 0; i < block.length; i++){
          sum += block[i].mandates;
      }
      return sum;
  }

  render(){
      return (
          <div id={"main-container"}>
              <div id={"container-1"}>
              <h2 style={{}}>מחשבון באדר-עופר</h2>
              <table>
                  <tr style={{padding: "5px", border: "1px solid black"}}>
                      <th style={{padding: "5px", border: "1px solid black"}}>
                          מפלגה
                      </th>
                      <th style={{padding: "5px", border: "1px solid black"}}>
                          קולות
                      </th>
                      <th style={{padding: "5px", border: "1px solid black"}}>
                          מנדטים
                      </th>
                  </tr>
                  {
                      this.state.partiesResults.map((item, i) => {
                          return(
                              <tr style={{padding: "5px",border: "1px solid black"}}>
                                  <td style={{padding: "5px",border: "1px solid black"}}>
                                      {item.name}
                                  </td>
                                  <td style={{padding: "5px",border: "1px solid black"}}>
                                      <input
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
                                  <td style={{padding: "5px", border: "1px solid black"}}>
                                      {item.mandates}
                                  </td>
                              </tr>
                          )
                      })
                  }

              </table>
              </div>
              {
                  this.state.results &&
                  <div >
                      <h3>
                          קואליציית ימין חרדים: {this.sumBlock("r")}
                      </h3>
                      <h3 >
                          קואליציית שמאל מרכז ערבים: {this.sumBlock("l")}
                      </h3>
                  </div>
              }
              <div id={"container-2"}>
                <button style={{ margin: "10px"}} disabled={this.enableCalculate()} onClick={this.calculate}>חשב</button>
                <button style={{ margin: "10px"}} disabled={this.enableClear()} onClick={this.onClear}>נקה הכל</button>
              </div>
          </div>
      );

  }

}

export default App;
