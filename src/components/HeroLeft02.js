/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TwoSidedLayout from "./TwoSidedLayout";

export default function HeroLeft02() {
  return (
    <div>
      <div className="lg:w-2/3 mx-auto flex flex-col gap-2 p-10">
        <Typography color="primary" fontSize="lg" fontWeight="lg">
          For More Details Contact
        </Typography>
        <Typography color="dark" fontSize="lg" fontWeight="lg">
          Soumya Manna
        </Typography>
        <Typography color="dark" fontSize="lg" fontWeight="lg">
          +91 9836899318
        </Typography>
        <Typography fontSize="lg" textColor="text.secondary" lineHeight="sm" fontWeight="lg">
          VENUE: Ritwik Sadan Kalyani
        </Typography>
        <Typography color="dark" fontSize="lg" fontWeight="md">
          Kalyani Stn Rd Connector, B 11, Block B, Kalyani, West Bengal 741235
        </Typography>
        <Typography color="dark" fontSize="lg" fontWeight="lg">
          Date: 12th Feb, 2024 <br/>
          Time: 4 PM Onwards
        </Typography>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.283531040779!2d88.44693120000001!3d22.976599099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f895246fb7d8c7%3A0xddfcf7be7f19553f!2sRitwik%20Sadan%2C%20Kalyani%20Stn%20Rd%20Connector%2C%20B%2011%2C%20Block%20B%2C%20Kalyani%2C%20West%20Bengal%20741235!5e0!3m2!1sen!2sin!4v1707568129136!5m2!1sen!2sin" width="100%" height="300" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}
