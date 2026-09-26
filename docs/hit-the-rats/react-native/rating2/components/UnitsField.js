import { useState, useEffect } from 'react';
import Unit from './Unit';
import { View, Text, Button, Alert } from 'react-native';

function isContainingTrue(arr) {
  return arr.some((v) => v);
}

function pushArr(limit, arr) {
  let generated = 0,
    newArr = new Array(arr.length).fill(false),
    index = 0,
    onebefore = false;
  for (let n of arr) {
    // if(generated == limit) break;
    if (onebefore) {
      onebefore = false;
      index++;
      continue;
    }
    let random = Math.random(),
      thistime = onebefore ? false : random >= 1 - 0.05 && generated !== limit;
    if (thistime) {
      generated++;
      newArr[index] = !n;
    }
    index++;
  }
  if(!isContainingTrue(newArr)) newArr[newArr.length / 2] = true; // ensure at least generating one.
  return newArr;
}

export default function UnitsFields({ size = 9 }) {
  const totalBlocks = size * size;
  const [arr, setArr] = useState(new Array(totalBlocks).fill(false));
  const [level, setLevel] = useState(1);
  const [c, setC] = useState(0);
  const [score, setScore] = useState(0);
  const [lost, setLost] = useState(0);
  const [isGaming, setIsGaming] = useState(false);
  const doUpdate = (thisIndex) => {
    setArr((_) => [
      ..._.map((s, i) => {
        let isHit = i === thisIndex && s === true;
        if (isHit) setScore((_) => _ + 1);
        return isHit ? false : s;
      }),
    ]);
  };

  const [i, setI] = useState(null);

  useEffect(() => {
    if(isGaming) 
    setI(
      setInterval(() => {
        setC((_) => _ + 1);
        setLevel(Math.ceil((score == 0 ? 1 : score) / 5));
        setArr((_n) => {
          if (isContainingTrue(_n)) 
            if (lost >= 5) {
              end('Too many lost');
              return new Array(_n.length).fill(false);
            }
            else setLost((_) => _ + 1);
          return pushArr(level, _n);
        });
      }, 1200)
    );

    return () => {
      setI((_) => {
        if(_ != null) clearInterval(_);
        return null;
      });
    };
  }, [isGaming, c]);

  function end(reason = 'Terminated') {
    setArr((_) => {
      setIsGaming((_x) => {
        alert(`Game End! : ${reason} (${_x})`);
        return false;
      });
      return new Array(_.length).fill(false);
    });
  }

  function reset() {
    setScore(0);
    setLevel(1);
    setLost(0);
  }

  return (
    <>
      <Text>
        {c} Level: {level}; Score: {score}; Missed: {lost}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 'auto',
          marginRight: 'auto',
          aspectRatio: '1/1',
          width: '100%',
          borderColor: 'black',
          borderWidth: 1,
          borderStyle: 'solid',
        }}>
        {arr.map((val, index) => (
          <Unit
            size={size}
            key={index}
            index={index}
            isShowing={val}
            doUpdate={() => {
              doUpdate(index);
            }}
          />
        ))}
      </View>
      <Button
        style={{ margin: 15 }}
        title={isGaming ? 'End' : 'Start'}
        onPress={() => {
          setIsGaming((_) => !_);
          isGaming ? end() : reset();
        }}
      />
    </>
  );
}
