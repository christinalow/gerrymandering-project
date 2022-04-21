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
    // width: 300,
    height: 200
}

const DistrictMeasureInfo = (props) => {
    // fake data for radar chart
    const dataA = {
        type: 'scatterpolar',
        r: [1.5, 10, 39, 31, 15, 1.5],
        theta: ['Majority-Minority Districts','Efficiency Gap','Competitive Districts', 'Projected Political Fairness', 'Compactness'],
        fill: 'toself',
        name: "District Plan #" + props.currentDp
    };

    const dataB = 
        {
            type: 'scatterpolar',
            r: [1.5, 28, 18, 31, 15, 24],
            theta: ['Majority-Minority Districts','Efficiency Gap','Competitive Districts', 'Projected Political Fairness', 'Compactness'],
            fill: 'toself',
            name: "District Plan #" + props.pinned
        };

    let basic = <>
        <h5 id="more-measures">Measures</h5>
        <div> <DistrictPlanMeasuresTable /> </div>
        <br></br>

        <h5 id="seat-vote"> Measure of Fairness - Seats to Vote</h5>
        <div style={curveStyle}> <SeatVoteCurve /> </div>
        <br></br>

        <h5 id="radar-chart">Radar Chart</h5>
        <div style={curveStyle}> <RadarCharting dataA={dataA} currentDp={props.currentDp} comparing={props.compare} /> </div>
        <br></br>
    </>;

    //IF USER CLICKS COMPARE BUTTON, CHANGE THE VIEW
    if (props.compare) {
        basic = <>
            <Table>
                <thead>
                    <tr>
                        <th style={{ float: 'left' }}>District Plan {props.currentDp}</th>
                        <th style={{ float: 'right' }}>District Plan {props.pinned}</th>
                    </tr>
                </thead>

                <tbody>
                    <Table className='column'>
                        <td>
                            <h5 id="more-measures">Measures</h5>
                            <div style={tableStyle}> <DistrictPlanMeasuresTable /> </div>
                            <br></br>

                            <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                            <div style={comparingStyle}> <SeatVoteCurve /> </div>
                        </td>
                    </Table>

                    <Table className='column'>
                        <td>
                            <h5 id="more-measures">Measures</h5>
                            <div style={tableStyle}> <DistrictPlanMeasuresTable /> </div>
                            <br></br>

                            <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                            <div style={comparingStyle}> <SeatVoteCurve /> </div>
                        </td>
                    </Table>
                </tbody>
            </Table>
            <h5 id="radar-chart">Radar Chart</h5>
            <div style={curveStyle}>
                <RadarCharting dataA={dataA} dataB={dataB} currentDp={props.currentDp} pinnedDp={props.pinned} comparing={props.compare} />
            </div>
        </>
    }

    return (basic);

}

export default DistrictMeasureInfo;