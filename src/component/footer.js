import { Link } from "react-router-dom";
import { Flex, Tooltip, Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Footer() {
  const apple = (
    <div>
      <Image
        preview={false}
        src="https://c.mql5.com/qr/F1qzfrtIhDI.png"
        width={148}
        height={148}
      ></Image>
      <p>Scan to install from Google Play</p>
    </div>
  );
  return (
    <div>
      <div id="footer">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-[20px] text-[#42639c]">
          <nav>
            <ul>
              <li>
                <Link
                  href="https://trade.metatrader5.com/"
                  target="_blank"
                  data-fz-event="MQL5+Footer+Trading"
                >
                  Online trading / WebTerminal
                </Link>
              </li>
              <li>
                <a href="/en/code" data-fz-event="MQL5+Footer+CodeBase">
                  Free technical indicators and robots
                </a>
              </li>
              <li>
                <a href="/en/articles" data-fz-event="MQL5+Footer+Articles">
                  Articles about programming and trading
                </a>
              </li>
              <li>
                <a href="/en/job" data-fz-event="MQL5+Footer+Job">
                  Order trading robots on the Freelance
                </a>
              </li>
              <li>
                <a href="/en/market" data-fz-event="MQL5+Footer+Market">
                  Market of Expert Advisors and applications{" "}
                </a>
              </li>
              <li>
                <a href="/en/signals" data-fz-event="MQL5+Footer+Signals">
                  Follow forex signals
                </a>
              </li>
              <li>
                <a href="/en/vps" data-fz-event="MQL5+Footer+VPS">
                  Low latency forex VPS
                </a>
              </li>
              <li>
                <a href="/en/forum" data-fz-event="MQL5+Footer+Forum">
                  Traders forum
                </a>
              </li>
              <li>
                <a href="/en/blogs" data-fz-event="MQL5+Footer+Blogs">
                  Trading blogs
                </a>
              </li>
              <li>
                <a href="/en/charts" data-fz-event="MQL5+Footer+Charts">
                  Charts
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <a
                  href="https://www.metatrader5.com"
                  data-fz-event="MQL5+Footer+MetaTrader+5"
                >
                  <span className="nobr">MetaTrader 5</span> Trading Platform
                </a>
              </li>
              <li>
                <a
                  href="https://www.metatrader5.com/en/releasenotes"
                  data-fz-event="MQL5+Footer+MetaTrader+5"
                >
                  <span className="nobr">MetaTrader 5</span> latest updates
                </a>
              </li>
              <li>
                <a
                  href="https://www.metatrader5.com/en/news"
                  data-fz-event="MQL5+Footer+MetaTrader+5"
                >
                  News, implementations and technology
                </a>
              </li>
              <li>
                <a
                  href="https://www.metatrader5.com/en/terminal/help"
                  data-fz-event="MQL5+Footer+MetaTrader+5"
                >
                  <span className="nobr">MetaTrader 5</span> User Manual
                </a>
              </li>
              <li>
                <a href="/en/docs" data-fz-event="MQL5+Footer+Docs">
                  MQL5 language of trading strategies
                </a>
              </li>
              <li>
                <a
                  href="https://cloud.mql5.com"
                  data-fz-event="MQL5+Footer+Cloud"
                >
                  MQL5 Cloud Network
                </a>
              </li>
              <li>
                <Link
                  href="https://www.finteza.com/?utm_source=www.mql5.com&amp;utm_medium=cpc&amp;utm_term=cross-link&amp;utm_content=visit.finteza.com&amp;utm_campaign=0791.finteza.cross-link"
                  data-fz-event="MQL5+Footer+Finteza"
                  target="_blank"
                >
                  End-to-End Analytics
                </Link>
              </li>
              <li>
                <a
                  href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.mql5.com&amp;utm_campaign=download"
                  data-fz-event="MetaTrader+5+Desktop+Download"
                >
                  Download <span className="nobr">MetaTrader 5</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.metatrader5.com/en/terminal/help/start_advanced/installation"
                  data-fz-event="MQL5+Footer+MetaTrader+5"
                >
                  Install Platform
                </a>
              </li>
              <li>
                <a
                  href="https://www.metatrader5.com/en/terminal/help/start_advanced/deinstallation"
                  data-fz-event="MQL5+Footer+MetaTrader+5"
                >
                  Uninstall Platform
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <a href="/en/about" data-fz-event="MQL5+Footer+About">
                  About
                </a>
              </li>
              <li>
                <a href="/en/wall" data-fz-event="MQL5+Footer+Wall">
                  Timeline
                </a>
              </li>
              <li>
                <a href="/en/about/terms" data-fz-event="MQL5+Footer+About">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="/en/about/autopayments"
                  data-fz-event="MQL5+Footer+About"
                >
                  Recurring Payment Agreement
                </a>
              </li>
              <li>
                <a
                  href="/en/about/agencyagreement"
                  data-fz-event="MQL5+Footer+About"
                >
                  Agency Agreement – Offer
                </a>
              </li>
              <li>
                <a href="/en/about/privacy" data-fz-event="MQL5+Footer+About">
                  Privacy and Data Protection Policy
                </a>
              </li>
              <li>
                <a href="/en/about/cookies" data-fz-event="MQL5+Footer+About">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="/en/contact" data-fz-event="MQL5+Footer+Contacts">
                  Contacts and requests
                </a>
              </li>
            </ul>
          </nav>

          <nav className="footer__products">
            <p className="text-[#42639c] pb-[8px]">Meta Trader 5</p>
            <Flex gap={"20px"}>
              <Tooltip
                style={{ width: "170px" }}
                placement="top"
                title={`Download MetaTrader 5 for Windows`}
                trigger={`hover`}
                color="#fff"
                key={`#fff`}
                arrow={false}
              >
                <FontAwesomeIcon
                  icon={icon({ name: "windows", style: "brands" })}
                  className="w-[24px] h-[24px]"
                  style={{ color: "#65A6EB" }}
                />
              </Tooltip>
              <Tooltip
                placement="top"
                title={`Download MetaTrader 5 for MacOS`}
                trigger={`hover`}
                color="#fff"
                key={`#fff`}
                arrow={false}
              >
                <div>
                  <img
                    srcSet="https://img.icons8.com/?size=256&id=vCiwbOh7Uo7G&format=png 1x"
                    alt=""
                    width={24}
                    height={24}
                  ></img>
                </div>
              </Tooltip>
              <Tooltip
                placement="top"
                title={`Download MetaTrader 5 for Linux`}
                trigger={`hover`}
                color="#fff"
                key={`#fff`}
                arrow={false}
              >
                <div>
                  <img
                    srcSet="https://img.icons8.com/?size=256&id=17842&format=png 1x"
                    alt=""
                    width={24}
                    height={24}
                  ></img>
                </div>
              </Tooltip>
              <Tooltip
                placement="top"
                title={`Open MetaTrader 5 WebTerminal`}
                trigger={`hover`}
                color="#fff"
                key={`#fff`}
                arrow={false}
              >
                <div>
                  <img
                    srcSet="https://img.icons8.com/?size=256&id=2963&format=png 1x"
                    alt=""
                    width={24}
                    height={24}
                  ></img>
                </div>
              </Tooltip>
              <Tooltip
                placement="top"
                title={apple}
                trigger={`hover`}
                color="#fff"
                key={`#fff`}
                arrow={false}
              >
                <FontAwesomeIcon
                  icon={icon({ name: "apple", style: "brands" })}
                  className="w-[24px] h-[24px] "
                  style={{ color: "#000" }}
                />
              </Tooltip>
              <Tooltip
                placement="top"
                title={apple}
                trigger={`hover`}
                color="#fff"
                key={`#fff`}
                arrow={false}
              >
                <div>
                  <img
                    srcSet="https://img.icons8.com/?size=256&id=FzggIjJKPC03&format=png 1x"
                    alt=""
                    width={24}
                    height={24}
                  ></img>
                </div>
              </Tooltip>
            </Flex>

            <Flex gap={"8px"} className="my-[20px]">
              <div>
                <p className="text-[#42639c] pb-[8px]">MQL5 Channels</p>
                <Flex gap={"8px"}>
                  <Tooltip
                    style={{ width: "170px" }}
                    placement="top"
                    title={`Download MetaTrader 5 for Windows`}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <FontAwesomeIcon
                      icon={icon({ name: "windows", style: "brands" })}
                      className="w-[24px] h-[24px]"
                      style={{ color: "#65A6EB" }}
                    />
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={`Download MetaTrader 5 for MacOS`}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <div>
                      <img
                        srcSet="https://img.icons8.com/?size=256&id=vCiwbOh7Uo7G&format=png 1x"
                        alt=""
                        width={24}
                        height={24}
                      ></img>
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={`Download MetaTrader 5 for Linux`}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <div>
                      <img
                        srcSet="https://img.icons8.com/?size=256&id=17842&format=png 1x"
                        alt=""
                        width={24}
                        height={24}
                      ></img>
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={`Open MetaTrader 5 WebTerminal`}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <div>
                      <img
                        srcSet="https://img.icons8.com/?size=256&id=2963&format=png 1x"
                        alt=""
                        width={24}
                        height={24}
                      ></img>
                    </div>
                  </Tooltip>
                </Flex>
              </div>
              <div>
                <p className="text-[#42639c] pb-[8px]">Economic Calendar</p>
                <Flex gap={"8px"}>
                  <Tooltip
                    placement="top"
                    title={`Download MetaTrader 5 for Linux`}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <div>
                      <img
                        srcSet="https://img.icons8.com/?size=256&id=17842&format=png 1x"
                        alt=""
                        width={24}
                        height={24}
                      ></img>
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={`Open MetaTrader 5 WebTerminal`}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <div>
                      <img
                        srcSet="https://img.icons8.com/?size=256&id=2963&format=png 1x"
                        alt=""
                        width={24}
                        height={24}
                      ></img>
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={apple}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <FontAwesomeIcon
                      icon={icon({ name: "apple", style: "brands" })}
                      className="w-[24px] h-[24px] "
                      style={{ color: "#000" }}
                    />
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={apple}
                    trigger={`hover`}
                    color="#fff"
                    key={`#fff`}
                    arrow={false}
                  >
                    <div>
                      <img
                        srcSet="https://img.icons8.com/?size=256&id=FzggIjJKPC03&format=png 1x"
                        alt=""
                        width={24}
                        height={24}
                      ></img>
                    </div>
                  </Tooltip>
                  `
                </Flex>
              </div>
            </Flex>
          </nav>
        </div>
      </div>
    </div>
  );
}
