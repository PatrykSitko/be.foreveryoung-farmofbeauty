import React, { useState } from "react";
import MenuMobile from "./mobile";
import MenuDesktop from "./desktop";
import MenuEntryMobile from "./entry/mobile";
import homeImage from "../../resources/backgrounds/menu/entry/icon/salon.svg";
import aboutImage from "../../resources/backgrounds/menu/entry/icon/about-us.svg";
import openingHoursImage from "../../resources/backgrounds/menu/entry/icon/passage-of-time.svg";
import galleryImage from "../../resources/backgrounds/menu/entry/icon/framing.svg";
import euroImage from "../../resources/backgrounds/menu/entry/icon/euro.svg";
import routeImage from "../../resources/backgrounds/menu/entry/icon/track.svg";
import contactImage from "../../resources/backgrounds/menu/entry/icon/business-cards.svg";
import MenuMobileBottom from "./bottom/mobile";
import MenuMobileBottomButtons from "./bottom/buttons";
import GenderToggleButton from "../buttons/toggle/gender";
import SlideToMessageButton from "../buttons/slide/message";
import SlideToCallButton from "../buttons/slide/call";
import FemaleButton from "../buttons/gender/female";
import MaleButton from "../buttons/gender/male";
import MenuEntryDesktop from "./entry/desktop";

export function DesktopMenu() {
  return <MenuDesktop></MenuDesktop>;
}
export function MobileMenu() {
  const [displayGenderButtons, setDisplayGenderButtons] = useState(false);
  return (
    <MenuMobile>
      <MenuEntryMobile image={homeImage}>Accueil</MenuEntryMobile>
      <MenuEntryMobile image={aboutImage}>À propos de nous</MenuEntryMobile>
      <MenuEntryMobile noMenuHandler separator />
      <MenuEntryMobile image={openingHoursImage}>Horaire</MenuEntryMobile>
      <MenuEntryMobile image={galleryImage}>Galerie</MenuEntryMobile>
      <MenuEntryMobile image={euroImage}>Prix</MenuEntryMobile>
      <MenuEntryMobile noMenuHandler separator />
      <MenuEntryMobile image={routeImage}>Route</MenuEntryMobile>
      <MenuEntryMobile image={contactImage}>Contact</MenuEntryMobile>
      <MenuMobileBottom>
        <MenuMobileBottomButtons.left>
          {displayGenderButtons ? <FemaleButton /> : <SlideToCallButton />}
        </MenuMobileBottomButtons.left>
        <MenuMobileBottomButtons.middle>
          <GenderToggleButton
            {...{ displayGenderButtons, setDisplayGenderButtons }}
          />
        </MenuMobileBottomButtons.middle>
        <MenuMobileBottomButtons.right>
          {displayGenderButtons ? <MaleButton /> : <SlideToMessageButton />}
        </MenuMobileBottomButtons.right>
      </MenuMobileBottom>
    </MenuMobile>
  );
}
