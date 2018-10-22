import React from "react";
import styled from 'styled-components';

const PlumeImg = styled.div`
    position: absolute;
    z-index:1000;
    height: 60px;
    width: 38px;
    background: url('${require("./../assets/img/Plume.png")}') 0px 0px;
    background-repeat: no-repeat;
`;

const animations = {
    right:[0,1,2,3,2,1],
    left:[4,5,6,7,6,5],
    stay:[8,9,10,11,10,9]
};

class Plume extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            showed:false,
            comboKey:0,
            plume:{
                index:0,
                frame:8,
                x:0,
                y:0,
                animation: "stay"
            },
            mouse:{
                x:0,
                y:0
            }
        };
    }

    plumeControls() {
        if (this.state.showed) {
            let plume = this.state.plume;
            if (this.state.mouse.x > plume.x) {
               plume.x += 1;
                plume.animation = "left";
            }
            if (this.state.mouse.x < plume.x) {
                plume.x -= 1;
                plume.animation = "right";
            }
            if (this.state.mouse.y > plume.y) {
                plume.y += 1;
            }
            if (this.state.mouse.y < plume.y) {
               plume.y -= 1;
            }

            if (this.state.mouse.y === plume.y && this.state.mouse.x === plume.x) {
                plume.animation = "stay";
            }

            this.setState({plume});
        }
    }

    plumeAnimation() {
        if (this.state.showed) {
            let plume = this.state.plume;

            plume.index++;
            plume.frame = animations[plume.animation][plume.index];
            if (plume.frame === undefined) {
                plume.frame = animations[plume.animation][0];
                plume.index = 0;
            }


            this.setState({plume});
        }
    }

    componentDidMount() {
        document.getElementById("___gatsby").onclick = event => {
            let mouse ={
                x:event.pageX,
                y:event.pageY
            };
            this.setState({mouse})
        };

        this.plumeControlsID = setInterval(
            () => this.plumeControls(),
            1
        );
        this.plumeAnimationID = setInterval(
            () => this.plumeAnimation(),
            100
        );

        //konami code
        window.onkeydown = e => {
            let combo = this.state.combo;
            if (
                combo === 0 && e.key === "ArrowUp" ||
                combo === 1 && e.key === "ArrowUp" ||
                combo === 2 && e.key === "ArrowDown" ||
                combo === 3 && e.key === "ArrowDown" ||
                combo === 4 && e.key === "ArrowLeft" ||
                combo === 5 && e.key === "ArrowRight" ||
                combo === 6 && e.key === "ArrowLeft" ||
                combo === 7 && e.key === "ArrowRight" ||
                combo === 8 && e.key === "b"
            ) {
                combo++;
            }
            else if (combo === 9 && e.key === "a") {
                this.setState({showed:true})
            }
            else {
                combo = 0;
            }

            this.setState({combo});
        };

    }

    componentWillUnmount() {
        clearInterval(this.plumeControlsID);
        clearInterval(this.plumeAnimationID);
    }

   render() {
        if (this.state.showed) {
           return (
                <PlumeImg style={{
                    backgroundPosition: `-${this.state.plume.frame * 38}px 0px`,
                    left: `${this.state.plume.x}px`,
                    top: `${this.state.plume.y}px`
                }} />
            );
        }
        else {
            return (<div/>);
        }
   }
};

export default Plume;