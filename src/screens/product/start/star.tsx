import React from "react";
import YellowStar from "@/icons/yellow-star";
import WhiteStar from "@/icons/white-star";
import {StarProps} from "./star.props";

const Star = ({rate}: StarProps) => {

  if (rate === 1) {
    return (
      <>
        <YellowStar/>
        <WhiteStar/>
        <WhiteStar/>
        <WhiteStar/>
        <WhiteStar/>
      </>
    )
  }

  if (rate === 2) {
    return (
      <>
        <YellowStar/>
        <YellowStar/>
        <WhiteStar/>
        <WhiteStar/>
        <WhiteStar/>
      </>
    )
  }

  if (rate === 3) {
    return (
      <>
        <YellowStar/>
        <YellowStar/>
        <YellowStar/>
        <WhiteStar/>
        <WhiteStar/>
      </>
    )
  }

  if (rate === 4) {
    return (
      <>
        <YellowStar/>
        <YellowStar/>
        <YellowStar/>
        <YellowStar/>
        <WhiteStar/>
      </>
    )
  }

  if (rate === 5) {
    return (
      <>
        <YellowStar/>
        <YellowStar/>
        <YellowStar/>
        <YellowStar/>
        <YellowStar/>
      </>
    )
  }

  return (
    <>
      <WhiteStar/>
      <WhiteStar/>
      <WhiteStar/>
      <WhiteStar/>
      <WhiteStar/>
    </>
  )
}

export default Star;