import React, { useState } from "react";
import { push } from "redux-first-routing";
import { connect } from "react-redux";
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

export function DesktopMenu({ changePath, mouse }) {
  return (
    <MenuDesktop onClick={() => changePath("/accueil")}>
      <MenuEntryDesktop.left
        {...{ mouse }}
        onClick={() => changePath("/horaire")}
      >
        Horaire
      </MenuEntryDesktop.left>
      <MenuEntryDesktop.left
        {...{ mouse }}
        onClick={() => changePath("/a-propos-de-nous")}
      >
        À propos de nous
      </MenuEntryDesktop.left>
      <MenuEntryDesktop.left
        {...{ mouse }}
        onClick={() => changePath("/accueil")}
      >
        Accueil
      </MenuEntryDesktop.left>
      <MenuEntryDesktop.right
        {...{ mouse }}
        onClick={() => changePath("/galerie")}
      >
        Galerie
      </MenuEntryDesktop.right>
      <MenuEntryDesktop.right
        {...{ mouse }}
        onClick={() => changePath("/prix")}
      >
        Prix
      </MenuEntryDesktop.right>
      <MenuEntryDesktop.right
        {...{ mouse }}
        onClick={() => changePath("/route")}
      >
        Route
      </MenuEntryDesktop.right>
      <MenuEntryDesktop.right
        {...{ mouse }}
        onClick={() => changePath("/contact")}
      >
        Contact
      </MenuEntryDesktop.right>
    </MenuDesktop>
  );
}
export function MobileMenu({ changePath, mouse }) {
  const [displayGenderButtons, setDisplayGenderButtons] = useState(false);
  return (
    <MenuMobile>
      <MenuEntryMobile
        {...{ mouse }}
        image={homeImage}
        onClick={() => changePath("/accueil")}
      >
        Accueil
      </MenuEntryMobile>
      <MenuEntryMobile
        {...{ mouse }}
        image={aboutImage}
        onClick={() => changePath("/a-propos-de-nous")}
      >
        À propos de nous
      </MenuEntryMobile>
      <MenuEntryMobile noMenuHandler separator />
      <MenuEntryMobile
        {...{ mouse }}
        image={openingHoursImage}
        onClick={() => changePath("/horaire")}
      >
        Horaire
      </MenuEntryMobile>
      <MenuEntryMobile
        {...{ mouse }}
        image={galleryImage}
        onClick={() => changePath("/galerie")}
      >
        Galerie
      </MenuEntryMobile>
      <MenuEntryMobile
        {...{ mouse }}
        image={euroImage}
        onClick={() => changePath("/prix")}
      >
        Prix
      </MenuEntryMobile>
      <MenuEntryMobile noMenuHandler separator />
      <MenuEntryMobile
        {...{ mouse }}
        image={routeImage}
        onClick={() => changePath("/route")}
      >
        Route
      </MenuEntryMobile>
      <MenuEntryMobile
        {...{ mouse }}
        image={contactImage}
        onClick={() => changePath("/contact")}
      >
        Contact
      </MenuEntryMobile>
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
const mapStateToProps = ({
  router: { pathname },
  state: {
    mouse,
    window: {
      inner: { width }
    }
  }
}) => {
  return { width, mouse, pathname };
};
const mapDispatchToProps = dispatch => {
  return { changePath: path => dispatch(push(path)) };
};
function Menu({ width, mouse, changePath, pathname }) {
  console.log(pathname);
  return width > 1450 ? (
    <DesktopMenu {...{ mouse, changePath }} />
  ) : (
    <MobileMenu {...{ mouse, changePath }} />
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
