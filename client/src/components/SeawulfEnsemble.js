import React, { useState, useEffect } from 'react';
import RepDemSplit from './RepDemSplit';
import MajMin from './MajMin';

const curveStyle = { //style for graphs
    height: '330px',
    width: 'inherit'
}

const SeawulfEnsemble = (props) => {

    return (<>
        <div id='maj-min' style={curveStyle} >
            <h5>Number of Majority-Minority Districts</h5>
            <MajMin />
        </div> <br/> <br/>
        <div id='repdem-split' style={curveStyle} >
            <h5>Republican/Democratic Split</h5>
            <RepDemSplit />
        </div>
    </>);
}

export default SeawulfEnsemble;