import SeatVoteCurve from './SeatVoteCurve';
import RadarCharting from './RadarChart';
import Table from 'react-bootstrap/Table';
import DistrictPlanMeasuresTable from './DistrictPlanMeasuresTable';

const curveStyle = { //style for graphs
    height: '330px',
    width: 'inherit'
}

const comparingStyle = { //style for compare view (seat plot)
    height: '300px',
    width: '300px'
}

const tableStyle = { //style for compare view (measure table)
    height: 350
}

const DistrictMeasureInfo = (props) => {
    let basic = <></>;
    let plan;
    let comparing;
    if (props.plans) {
        plan = props.plans.find(x => x.dupPlanId === props.current);
        comparing = props.plans.find(x => x.dupPlanId === props.pinnedDp);

        let dataA = {
            type: 'scatterpolar',
            r: [plan.numMajorityMinorityDistricts, plan.efficiencyGap, plan.competitiveDistrictCount, plan.splitCounty, plan.polsbyPopper],
            theta: ['Majority-Minority Districts', 'Efficiency Gap', 'Competitive Districts', 'Split Counties', 'Compactness'],
            fill: 'toself',
            name: "District Plan #" + props.currentDp + "       "
        };

        basic = <>
            <h5 id="more-measures">Measures</h5>
            <div> <DistrictPlanMeasuresTable plan={plan} /> </div>
            <br></br>

            <h5 id="political-fairness">Political Fairness</h5>
            <h6>Seats to Vote Plot</h6>
            <div style={curveStyle}> <SeatVoteCurve /> </div>
            <br></br>
            <Table striped responsive="sm" bordered hover>
                <thead>
                    <tr>
                        <th>Measure</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Efficiency Gap</td>
                        <td>{plan.efficiencyGap}</td>
                    </tr>
                    <tr>
                        <td>Mean-Median Difference</td>
                        <td>{plan.meanMedianDiff}</td>
                    </tr>
                </tbody>
            </Table>
            <hr />
            <h5 id="radar-chart">Radar Chart</h5>
            <RadarCharting dataA={dataA} currentDp={props.currentDp} comparing={props.compare} />
        </>;
    }

    //IF USER CLICKS COMPARE BUTTON, CHANGE THE VIEW
    if (props.compare) {

        let dataA = {
            type: 'scatterpolar',
            r: [plan.numMajorityMinorityDistricts, plan.efficiencyGap, plan.competitiveDistrictCount, plan.splitCounty, plan.polsbyPopper],
            theta: ['Majority-Minority Districts', 'Efficiency Gap', 'Competitive Districts', 'Split Counties', 'Compactness'],
            fill: 'toself',
            name: "District Plan #" + props.currentDp + "       "
        };

        let dataB = {
            type: 'scatterpolar',
            r: [comparing.numMajorityMinorityDistricts, comparing.efficiencyGap, comparing.competitiveDistrictCount, comparing.splitCounty, comparing.polsbyPopper],
            theta: ['Majority-Minority Districts', 'Efficiency Gap', 'Competitive Districts', 'Split Counties', 'Compactness'],
            fill: 'toself',
            name: "District Plan #" + props.currentDp + "       "
        };

        basic = <>
            <Table>
            <thead>
                <tr>
                    <th style={{ float: 'left' }}>{plan.dupPlanId}</th>
                    <th style={{ float: 'right' }}>{comparing.dupPlanId}</th>
                </tr>
            </thead>

                <tbody>
                    <Table className='column'>
                        <td>
                            <h5 id="more-measures">Measures</h5>
                            <div style={tableStyle}> <DistrictPlanMeasuresTable plan={plan} /> </div>
                            <br></br><br></br>

                            <h5 id="political-fairness">Political Fairness</h5>
                            <h6>Seats to Vote Plot</h6>
                            <div style={comparingStyle}> <SeatVoteCurve /> </div>
                            <br></br>
                            <Table striped responsive="sm" bordered hover>
                                <thead>
                                    <tr>
                                        <th>Measure</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Efficiency Gap</td>
                                        <td>{plan.efficiencyGap}</td>
                                    </tr>
                                    <tr>
                                        <td>Mean-Median Difference</td>
                                        <td>{plan.meanMedianDiff}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </td>
                    </Table>

                    <Table className='column'>
                        <td>
                            <h5 id="more-measures">Measures</h5>
                            <div style={tableStyle}> <DistrictPlanMeasuresTable plan={plan} /> </div>
                            <br></br><br></br>

                            <h5 id="political-fairness">Political Fairness</h5>
                            <h6>Seats to Vote Plot</h6>
                            <div style={comparingStyle}> <SeatVoteCurve /> </div>
                            <br></br>
                            <Table striped responsive="sm" bordered hover>
                                <thead>
                                    <tr>
                                        <th>Measure</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Efficiency Gap</td>
                                        <td>{comparing.efficiencyGap}</td>
                                    </tr>
                                    <tr>
                                        <td>Mean-Median Difference</td>
                                        <td>{comparing.meanMedianDiff}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </td>
                    </Table>
                </tbody>
            </Table>
            <h5 id="radar-chart">Radar Chart</h5>
            <RadarCharting dataA={dataA} dataB={dataB} currentDp={props.currentDp} pinnedDp={props.pinned} comparing={props.compare} />
        </>
    }

    return (basic);

}

export default DistrictMeasureInfo;