import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 0px -1px 60px;
  display: relative;
  // width: auto;

  width: 100%;
  height: auto;
  overflow-y: auto;
  overflow-x: none;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .postTextInput {
    cursor: text;
    z-index: 1;
    :focus {
      outline: none;
    }
  }

  .postTextInput[contenteditable]:empty:before {
    content: attr(placeholder);
    display: block;
    color: #999;
  }

  .postTextOutput {
    z-index: 2;
    pointer-events: none;
    :focus {
      outline: none;
    }
  }

  .postTextOutput,
  .postTextInput {
    border: none;
    // background: ;
    resize: none;
    padding: 5px;
    text-align: left;
    width: 100%;
    height: auto;
    position: absolute;
  }
`;

export const PostText = styled.div`
  width: 100%;
  height: 5%;
  overflow-y: auto;
  overflow-x: none;
  position: relative;
  box-sizing: border-box;

  .postTextInput {
    cursor: text;
    z-index: 1;
    :focus {
      outline: none;
    }
  }

  .postTextInput[contenteditable]:empty:before {
    content: attr(placeholder);
    display: block;
    color: #999;
  }

  .postTextOutput {
    z-index: 2;
    pointer-events: none;
    :focus {
      outline: none;
    }
  }

  .postTextOutput,
  .postTextInput {
    border: none;
    background: transparent;
    resize: none;
    text-align: left;
    width: 100%;
    height: auto;
    position: absolute;
  }
`;
