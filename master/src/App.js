import styled, {keyframes} from "styled-components";

const Father = styled.div`
    display: flex;
`;
const Child = styled.div`
    background-color: ${props => props.bgColor};
    width: 100px;
    height: 100px;
`;
const Circle = styled(Child)`
    border-radius: 50px;
`;
const Btn = styled.button`
    color:white;
    background-color: tomato;
    border: 0;
    border-radius: 15px;
`;
const Input = styled.input.attrs({required : true, minLength : 10})`
    background-color: tomato;
`;
const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.backgroundColor};
`;
const rotationAnimation = keyframes`
    0% { 
        transform:rotate(0deg);    
        border-radius: 0px;
    } 
    50% {
        transform:rotate(180deg);
        border-radius: 50px;
    }
    100% {
        transform:rotate(360deg);
        border-radius: 100px;
    }
`;
const Emoji = styled.div`
    font-size: 36px;
`;
const Box = styled.div`
    height: 200px;
    width: 200px;
    background-color: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotationAnimation} 1s linear infinite;
    ${Emoji}:hover {
        font-size: 98px
    } 
`;
const Rectangle = styled.div`
    background-color: ${props => props.bgColor};
    width: 100px;
    height: 100px;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.textColor};
`
function App() {
  return (
      <>
          <Father>
              <Child bgColor="teal"/>
              <Circle bgColor="tomato"/>
          </Father>
          <Father>
              <Btn>Login</Btn>
              <Btn as="a" href="/">Logout</Btn>
          </Father>
          <Father>
              <Input />
              <Input />
              <Input />
              <Input />
              <Input />
              <Input />
          </Father>
          <Wrapper>
              <Box>
                <Emoji>😀</Emoji>
              </Box>
              <Emoji>👨</Emoji>
          </Wrapper>
          <Wrapper>
              <Rectangle bgColor="teal"/>
              <Rectangle bgColor="tomato"/>
              <Title>HELLO</Title>
          </Wrapper>
      </>
  );
}

export default App;
