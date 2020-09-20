import React from "react"
import axios from "axios";
import { toast } from 'react-toastify';

import ContestPanelList from "../components/competition/contestPanelList"
import {isPastEndDate } from "../util/dateCompare"
import { CONTEST_DATA_URL } from "../constants"
import Layout from "../components/layout/layout"
import Hero from "../components/hero"
import Explainer from "../components/explainer"

class Home extends React.Component {

  componentDidMount() {
    axios.get(CONTEST_DATA_URL)
      .then(res => {
        const contests = res.data;
        this.setState({contests});
      }
    ).catch(function (error) {
      toast.error("Unable to load contest, plese try again in a few minutes");
    })
  }
  
  render() {
    var currentContests = null 
    if (this.state && this.state.contests) {
      currentContests = this.state.contests 
        //.filter(contest => !isPastEndDate(contest.endDate))
    }
    return (
      <Layout fullWidth>
        <div className="row">
          <Hero
            link="/about"
            header="Legislation for the people, by the people"
            buttonText="Learn More About Turq »"
            subtext="If you want better public policy, you need a legislative bill written. If you want a bill written, you have limited options. Either write it yourself, or get a politician to write it for you. But thousands of other constituents are also asking politicians to write them legislation everyday, and writing it yourself can be intimidating. Turq is the solution."/>
        </div>
        <div className=" my-5">
          {currentContests && currentContests.length > 0
          ? <div>
              <ContestPanelList title="Active Contests" contests={currentContests} />
            </div>
          : <></>
          }
        </div>
      </Layout>
    )
  }
}

export default Home
