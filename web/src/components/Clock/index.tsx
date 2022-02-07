import { useContext } from "react";
import { ClockContext } from "../../contexts/ClockContext";
import ClockBackground from '../../resources/clock_background.svg';
import styled from "styled-components";

export type ClockProps = {
  time: number
}

const ClockBase = styled("div")`
  border: 10px black solid;
  border-radius: 50%;
  width: 50vh;
  height: 50vh;
  position: relative;
  background: #fff ${() =>`url(${ClockBackground})`} no-repeat center;
  background-size: 90%;
`

const ClockContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  :after{
    background: black;
    border-radius: 50%;
    content: "";
    position: absolute;
    left: 48.5%;
    top: 48.5%;
    width: 3%;
    height: 3%;
    z-index: 5;
  }
`

interface ClockElementProps {
  $angle: number
}
const Handle = styled("div")<ClockElementProps>`
  position: absolute;
  top: 50%;
  height: 1px;
  left: 50%;
  transform: rotate(${(props) => props.$angle}deg);
  transform-origin: left;
`

const Hours = styled(Handle)`
  width: 12vh;
  height: 3px;
  background: black;
`

const Minutes = styled(Handle)`
width: 17vh;
background: black;`

const Seconds = styled(Handle)`
  background: red;
  width: 18vh;
`

const Clock = () =>{
  const {time, online} = useContext(ClockContext);
  if(!online){
    return <div>Loading...</div>
  }
  const [hours, minutes, seconds] = time.split(":").map(val => parseInt(val));
  return <ClockContainer><ClockBase>
        <Seconds $angle={(360/60)*(seconds-15)}/>
        <Minutes $angle={(360/60)*(minutes-15)}/>
    <Hours $angle={(360/12)*((hours%12)-3) + ((360/60)*(minutes)/12)}/>
  </ClockBase></ClockContainer>
}

export default Clock;