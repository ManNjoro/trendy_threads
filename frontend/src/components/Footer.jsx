import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer>
        <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaTiktok />
        </div>
    </footer>
  )
}
