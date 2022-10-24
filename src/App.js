import React, {Component} from "react";
import "./App.css"
const ALL_MANDATES = 120;
const BLOCKAGE_THRESHOLD_RATE = 3.25;
function sum_of_property_in_objects_array(array_of_objects, props){
    let sum = 0;
    array_of_objects.forEach(obj=> {
        props.forEach(prop=>{
            sum += obj[prop]
        })
    })
    return sum
}
let groups = [{"names":['הליכוד','הציונות הדתית']},{"names":['יש עתיד', 'המחנה הממלכתי']}, {"names":['יהדות התורה','ש"ס']},{"names":['העבודה','מרץ']},{"names":['ישראל ביתנו']},{"names":['חד"ש תע"ל']},{"names":['רע"מ']},{"names":['בל"ד']},{"names":['הבית היהודי']}]

class App extends Component {
  state = {
      partiesResults: [
          {"name": 'הליכוד', "votes": 1066892, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'יש עתיד', "votes": 614112, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'הציונות הדתית', "votes": 225641, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'המחנה הממלכתי', "votes": 501157, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'יהדות התורה', "votes": 248391, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'ש"ס', "votes": 316008, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
          {"name": 'ישראל ביתנו', "votes": 248370, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'העבודה', "votes": 268767, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'חד"ש תע"ל', "votes": 212583, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'מרץ', "votes": 202218, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'רע"מ', "votes": 167064, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'בל"ד', "votes": 50000, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "l"},
          {"name": 'הבית היהודי', "votes": 273836, "mandates": 0, "moreMandates": 0, "next_mandate_votes_per_mandate": 0, "side": "r"},
      ],
      results: false
  }


  calculate = () => {
      this.state.partiesResults.forEach((party) => {
          party.mandates = 0;
          party.next_mandate_votes_per_mandate = 0;
          party.moreMandates = 0;

      })

      let allVotes = 0;
      for (let i = 0; i < this.state.partiesResults.length; i++){
          allVotes += this.state.partiesResults[i].votes;
      }
      console.log("allVotes: " + allVotes)

      let blockageThreshold = (allVotes / 100) * BLOCKAGE_THRESHOLD_RATE
      let partiesOverBlockageThreshold = this.state.partiesResults.filter(party => party.votes >= blockageThreshold);
      console.log(partiesOverBlockageThreshold)

      let allCountedVotes = 0;
      for (let i = 0; i < partiesOverBlockageThreshold.length; i++){
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
      this.updateGroupsFromParties(partiesOverBlockageThreshold)
      let i = 0
      while (this.remainedMandates(ALL_MANDATES, groups) > 0){
          console.log("i: " + i)
          i++;
          let groupIndexToAddMandate = this.max(groups);
          groups[groupIndexToAddMandate]["moreMandates"] += 1
          groups[groupIndexToAddMandate].next_mandate_votes_per_mandate = groups[groupIndexToAddMandate].votes / (
              groups[groupIndexToAddMandate].mandates + groups[groupIndexToAddMandate].moreMandates + 1)
          console.log("partyToAddMandate: " + groups[groupIndexToAddMandate].name)
      }
      for(let i = 0; i < groups.length; i++){
          let groupMandates = groups[i].mandates + groups[i].moreMandates
          let votes_per_mandate = groups[i].votes / groupMandates
          for(let j = 0; j < groups[i].names.length; j++) {
              let partyIndex = partiesOverBlockageThreshold.findIndex(party=> party.name === groups[i].names[j])
              partiesOverBlockageThreshold[partyIndex]["mandates"] = Math.floor(partiesOverBlockageThreshold[partyIndex].votes / votes_per_mandate)
              partiesOverBlockageThreshold[partyIndex]["next_mandate_votes_per_mandate"] = partiesOverBlockageThreshold[partyIndex].votes / (partiesOverBlockageThreshold[partyIndex]["mandates"] + 1)
          }
          let group_parties = partiesOverBlockageThreshold.filter((party)=> groups[i]["names"].includes(party["name"]))
          let group_parties_mandates  =   sum_of_property_in_objects_array(group_parties, ["mandates"])
          if (group_parties_mandates < groupMandates){
              let partyNameToAddMandate = group_parties[this.max(group_parties)].name;
              let partyIndex = partiesOverBlockageThreshold.findIndex(party=> party.name === partyNameToAddMandate)
              partiesOverBlockageThreshold[partyIndex]["moreMandates"] += 1
          }
      }

      partiesOverBlockageThreshold.forEach(party => {
          this.state.partiesResults[party.name] = party;
      })
      this.state.partiesResults.sort(function(a, b){return (b.mandates + b.moreMandates) - (a.mandates + a.moreMandates)})
      this.setState({
          results: true
      })

  }

  updateGroupsFromParties = (partiesOverBlockageThreshold)=>{
      for (let i =0; i < groups.length; i++){
          let group = partiesOverBlockageThreshold.filter((party)=> groups[i]["names"].includes(party["name"]))
          groups[i]["votes"] = sum_of_property_in_objects_array(group, ["votes"])
          groups[i]["mandates"]  =   sum_of_property_in_objects_array(group, ["mandates"])
          groups[i]["next_mandate_votes_per_mandate"] = groups[i].votes / (groups[i].mandates + 1)
      }
      return groups
  }

  max = (partiesOverBlockageThreshold) => {
        let index = 0;
        let max = 0;
        for (let i = 0; i < partiesOverBlockageThreshold.length; i++){
            if (max < partiesOverBlockageThreshold[i].next_mandate_votes_per_mandate){
                max = partiesOverBlockageThreshold[i].next_mandate_votes_per_mandate;
                index = i;
            }
        }
        return index;
    }
  remainedMandates = (allMandates, parties) => {
      let sum = 0;
      for (let i = 0; i < parties.length; i++){
          sum += (parties[i].mandates + parties[i].moreMandates);
      }
      return allMandates - sum;
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
      for (let i = 0; i < block.length; i++){
          sum += (block[i].mandates + block[i].moreMandates);
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
                      <th style={{padding: "5px", border: "1px solid black"}}>
                          מנדטים שנוספו
                      </th>
                      <th style={{padding: "5px", border: "1px solid black"}}>
                          סה"כ
                      </th>
                  </tr>
                  {
                      this.state.partiesResults.map((item, i) => {
                          return(
                              <tr style={{padding: "5px",border: "1px solid black"}}>
                                  <td style={{padding: "5px",border: "1px solid black", backgroundColor: (item.moreMandates > 0) ? "#23ff32" : null}}>
                                      {item.name}
                                  </td>
                                  <td style={{padding: "5px",border: "1px solid black"}}>
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
                                  <td style={{padding: "5px", border: "1px solid black"}}>
                                      {item.mandates}
                                  </td>
                                  <td style={{padding: "5px", border: "1px solid black"}}>
                                      {item.moreMandates}
                                  </td>
                                  <td style={{padding: "5px", border: "1px solid black", backgroundColor: (item.moreMandates > 0) ? "#23ff32" : null}}>
                                      {item.moreMandates + item.mandates}
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
