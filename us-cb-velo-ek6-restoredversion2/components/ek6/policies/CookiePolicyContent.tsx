import { LegalH2, LegalH3, LegalPage } from "./LegalPage";

export function CookiePolicyContent() {
  return (
    <LegalPage title="Cookie Policy">
      <section className="space-y-4">
        <LegalH2>What Are Cookies</LegalH2>
        <p>
          Cookies are small text files that are used to store small pieces of information. The cookies are stored on your
          device when the website is loaded on your browser. These cookies help us make the website function properly, make
          the website more secure, and provide better user experience.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>How We Use Cookies</LegalH2>
        <p>
          As most of the online services, our website uses first-party and third-party cookies for several purposes.
          First-party cookies are mostly necessary for the website to function the right way, and they do not collect any of
          your personally identifiable data.
        </p>
        <p>
          The third-party cookies used on our website are primarily for understanding how the website performs, how you
          interact with our website, keeping our services secure, providing advertisements that are relevant to you, and
          all in all providing you with a better and improved user experience.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Types of Cookies We Use</LegalH2>
        <div className="space-y-6">
          <div>
            <LegalH3>Essential Cookies</LegalH3>
            <p className="mt-2">
              Some cookies are essential for you to be able to experience the full functionality of our site. They allow us
              to maintain user sessions and prevent any security threats. They do not collect or store any personal
              information. For example, these cookies allow you to log-in to your account and add products to your basket and
              checkout securely.
            </p>
          </div>
          <div>
            <LegalH3>Statistics Cookies</LegalH3>
            <p className="mt-2">
              These cookies store information like the number of visitors to the website, the number of unique visitors,
              which pages of the website have been visited, the source of the visit, etc. These data help us understand and
              analyze how well the website performs and where it needs improvement.
            </p>
          </div>
          <div>
            <LegalH3>Marketing Cookies</LegalH3>
            <p className="mt-2">
              Our website displays advertisements. These cookies are used to personalize the advertisements that we show to
              you so that they are meaningful to you. These cookies also help us keep track of the efficiency of these ad
              campaigns.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <LegalH2>How Can I Control the Cookie Preferences?</LegalH2>
        <p>
          In addition to the options provided on our site, different browsers provide different methods to block and delete
          cookies used by websites. You can change the settings of your browser to block/delete the cookies. To find out more
          about how to manage and delete cookies, visit{" "}
          <a
            className="font-bold text-blue-600 hover:underline"
            href="https://www.allaboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            allaboutcookies.org
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact Us</LegalH2>
        <p>
          If you have any questions about our Cookie Policy, please contact us at{" "}
          <a className="font-bold text-blue-600 hover:underline" href="mailto:support@cybervelopro.com">
            support@cybervelopro.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
