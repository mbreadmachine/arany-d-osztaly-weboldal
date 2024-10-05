import React from "react";
import { NavBar } from "../components/NavBar";

export const PrivacyPolicy = () => {
  return (
    <div className="PrivacyP">
      <NavBar title="Adatvédelmi irányelv" />
      <h1>ADATVÉDELMI IRÁNYELV</h1>

      <p>
        Ez az adatvédelmi irányelv ("Irányelv") az aranyd.vercel.app weboldalra
        ("Webhely") vonatkozik, amelynek tulajdonosa és üzemeltetője Kraszni Marcell ("mi", "minket", "miénk"). Ez az Irányelv
        leírja, hogyan gyűjtünk, használunk és osztunk meg személyes
        információkat a Webhelyünk felhasználóiról.
      </p>

      <h2>Milyen Információkat Gyűjtünk</h2>

      <p>
        A Webhelyünkön semmilyen bejelentkezési funkció vagy cookie (sütik) nem
        található, így nem gyűjtünk személyes adatokat a felhasználóinktól.
        Azonban Google Ads hirdetéseket helyezünk el, amik a Google saját
        adatvédelmi irányelve szerint gyűjthet adatokat.
      </p>

      <h2>Milyen Információkat Osztunk Meg</h2>

      <p>
        Mivel nem gyűjtünk személyes adatokat, nincsenek olyan információk,
        amelyeket megosztanánk.
      </p>

      <h2>A Felhasználói Hozzáférések Változásai</h2>

      <p>
        Az információgyűjtés módjának változása esetén frissíteni fogjuk ezt az
        Adatvédelmi Irányelvet. Kérjük, rendszeresen tekintse meg ezt az
        Irányelvet.
      </p>

      <h2>Lépjen Velünk Kapcsolatba</h2>

      <p>
        Ha kérdése van ezzel az Adatvédelmi Irányelvvel kapcsolatban, vegye fel
        velünk a kapcsolatot <a href="mailto:krasznimarci+aranydweboldal@gmail.com">ezen</a> az e-mail címen.
      </p>

      <p>Utolsó frissítés dátuma: 2023. október 16.</p>
    </div>
  );
};
