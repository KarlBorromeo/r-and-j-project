<template>
    <button>
    <slot></slot>
    </button>
  </template>


  <style scoped>
  button{
      border: none;
      padding: .5rem 1rem;
      text-decoration: none;
      text-transform: capitalize;
      color: black;
      border-radius: .5rem;
      box-shadow: 0 0 .2rem .1rem rgba(0, 0, 0, 0.2);
      position: relative;
      white-space: nowrap;
      background-color: #F0A500;
      cursor: pointer;
      z-index: 1;
      transition: all .5s ease-in-out;
      text-transform: capitalize;
      margin: .5rem;
  }
  button::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      border-radius: .5rem;
      transition: all .5s ease-in-out;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1;
      transform: scale(.9);
      font-weight: 600;
  }
  button::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      border-radius: .5rem;
      background-color: #F0A500;
      z-index: -1;
      transition: all .5s ease-in-out;
  }
  button:hover::after,
  button:hover{
    background-color:  #CF7500;
    color: white;
  }
  button:hover::before{
    transform: scale(1.5);
    opacity: 0;
  }

  button:active::after,
  button:active{
    transform: scale(.95);
    box-shadow: none;
  }
  </style>