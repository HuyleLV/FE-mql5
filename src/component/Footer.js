import "./footer.css";
export default function Footer() {
  return (
    <div>
      <div id="footer">
        <div className="grid grid-cols-4 gap-4 p-[20px] text-[#42639c]">
          <nav>
            <ul>
              <li>
                <a
                  href="https://trade.metatrader5.com/"
                  target="_blank"
                  data-fz-event="MQL5+Footer+Trading"
                >
                  Online trading / WebTerminal
                </a>
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
                <a
                  href="https://www.finteza.com/?utm_source=www.mql5.com&amp;utm_medium=cpc&amp;utm_term=cross-link&amp;utm_content=visit.finteza.com&amp;utm_campaign=0791.finteza.cross-link"
                  data-fz-event="MQL5+Footer+Finteza"
                  target="_blank"
                >
                  End-to-End Analytics
                </a>
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
            <img url="https://c.mql5.com/i/shared/ico_footer_desktop5_2x.png"></img>
            <div className="footer__networks-list">
              <a
                href="https://www.facebook.com/mql5.community/"
                target="_blank"
                title="Facebook"
                rel="noreferrer"
              >
                <i className="icons-networks icons-networks_fb"></i>
              </a>
              <a
                href="https://t.me/mql5dev"
                target="_blank"
                title="Telegram"
                rel="noreferrer"
              >
                <i className="icons-networks icons-networks_tg"></i>
              </a>
              <a
                href="https://twitter.com/mql5com"
                target="_blank"
                title="X (Twitter)"
                rel="noreferrer"
              >
                <i className="icons-networks icons-networks_tw"></i>
              </a>
            </div>

            <div className="footer__networks">
              <div className="footer__networks-list">
                <a
                  href="https://www.facebook.com/mql5.community/"
                  target="_blank"
                  title="Facebook"
                  rel="noreferrer"
                >
                  <i className="icons-networks icons-networks_fb"></i>
                </a>
                <a href="https://t.me/mql5dev" target="_blank" title="Telegram">
                  <i className="icons-networks icons-networks_tg"></i>
                </a>
                <a
                  href="https://twitter.com/mql5com"
                  target="_blank"
                  title="X (Twitter)"
                >
                  <i className="icons-networks icons-networks_tw"></i>
                </a>
              </div>

              <span>
                Follow us on socials for top articles and CodeBase updates
              </span>
            </div>

            <div className="footer__other">
              <div className="footer__not-a-broker">
                Not a broker, no real trading accounts
              </div>
              <div className="copyright">
                35 Dodekanisou str, Germasogeia,
                4043,&nbsp;Limassol,&nbsp;Cyprus
              </div>
              <div className="copyright">
                Copyright 2000-2023,{" "}
                <span className="nobr">MetaQuotes Ltd</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
