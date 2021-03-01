const { name, version, description, consentVersion } = require('./package.json');

const title = 'Ad Observer';

// override any of these.
module.exports = (isDebug = false) => ({
  name: 'Ad Observer', // the extension name (uses what's in package.json as a default)
  title,
  description,
  version: '3.0.11', // legacy build is v2.0+, this is better, so it's 3.0
  consentVersion, // if you change this, strange things might happen.
  extensionProviderId: 'nyu',
  geckoId: 'developers@adobserver.org',
  includeYoutube: true,
  homepage: 'https://adobserver.org',
  assetsPath: 'assets',
  defaultIcon: 'icon128.png',

  helpText: `
  <p>
  </p>`,
  preferencesPageFooter: `
  <p>
  </p>`,

  consentText: `<style>
  p,h1,h4,h3,ul{
             margin: 2vmax;
  }
  p {
  line-height: 1; margin-top: 0pt; margin-bottom: 8pt;
  }
  h4 {
  line-height: 1; margin-top: 2pt; margin-bottom: 0pt;
  }
  p span, h4 span {
  font-size:11pt;font-family:Arial;color:#3c434e;background-color:transparent;font-weight:400;
  font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;
  }
</style>

<h4 style="margin-bottom: 12pt;">Thank you for installing Ad Observer and helping us monitor online political ads.</h4>
<p><span style="font-style:normal;">These Terms of Use form a legal agreement between you, the end user (“user” or “you”) and New York University (“NYU”, “us” or “we”), for the limited license to use the Ad Observer application, which includes a web browser extension, computer software and electronic documentation (“the Application” or “Ad Observer”).</span></p>
<h4><span style="font-style:italic;">Ownership and distribution</span></h4>
<p><span style="font-style:normal;">The Application is owned and copyrighted by NYU. NYU grants you a limited, worldwide, non-exclusive, royalty-free, revocable, and non-commercial license to download and use Ad Observer. Your license to download and use the Application confers no title or ownership in the Application and should not be construed as a sale of any right in the Application.</span></p>
<p><span style="font-style:normal;">Ad Observer may be freely distributed subject, but not limited to the following terms:</span></p>
  <ul><li>Unless you have the express written consent of NYU, you may not distribute the Application or any portion thereof to any third parties;</li><li>If the user would like to distribute the Application they will need to contact NYU at developers@adobserver.org for written consent prior to distribution;</li><li>The user may not sell or re-sell the Application;</li><li>The user must not distribute the Application as part of any commercial package;</li><li>The user must not use or distribute the Application in support of a commercial service;</li><li>The user must not use or distribute the Application to support any kind of profit generating activity, even if it is being distributed freely.</li></ul>
<h4><span style="font-style:italic;">User conduct</span></h4>
<p><span style="font-style:normal;">The user is strictly prohibited from, and agrees not to adapt, edit, change, modify, transform, publish, republish, distribute, or redistribute the Application or any elements, portions, or parts thereof without NYU’s prior written consent. You agree not to use any automated data collection methods, data mining, robots, scraping or any data gathering methods of any kind on the Application.&nbsp;</span></p>
<h4><span style="font-style:italic;">Copyright</span></h4>
<p><span style="font-style:normal;">The Application and all rights, without limitation including proprietary rights therein, are owned by NYU and protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties. The Application is licensed, not sold. You acknowledge that no title to the intellectual property in the Application is transferred to you. You further acknowledge that title and full ownership rights to the Application will remain the exclusive property of NYU and you will not acquire any rights to the Application except as expressly set forth in this license. You agree that any copies of the Application will contain the same proprietary notices which appear on and in the Application. NYU may bring legal proceedings against individuals who contravene these Terms of Use, including to enforce its copyrights to Ad Observer.&nbsp;</span></p>
<h4><span style="font-style:italic;">Warranties</span></h4>
<p><span style="font-style:normal;">Ad Observer is provided to the user “AS IS” with no warranties for use or performance and NYU disclaims any warranty or liability obligations to the user of any kind, whether expressed or implied. Where legislation implies in this agreement any condition or warranty, and that legislation avoids or prohibits provisions in an agreement excluding or modifying application of or exercise of liability under such condition or warranty, the condition or warranty will be deemed to be included in this agreement.</span></p>
<h4><span style="font-style:italic;">Limitation of Liability</span></h4>
<p><span style="font-style:normal;">NYU is not subject to, and the user releases NYU from any additional liability and indemnifies them against any claim, action, suit or proceeding (including but not limited to direct, indirect, consequential loss or damage, removal costs or re-installation costs or liability for loss of use or profit) because of the use of or inability to use the Application or the provision of or failure to provide support services, any delay in delivery or fault or defect in the Application even if NYU has been advised of the possibility of such damages. NYU‘s entire liability under this agreement shall be limited to the amount paid by the user for the Application. The user further indemnifies NYU against any claim, action suit or proceedings brought by any web site provider or any copyright holder in respect of the operation of the Application by the user. The user expressly acknowledges and agrees that it has not relied upon, and NYU is not liable for any advice given by NYU, its servants, agents, representatives or employees in relation to the suitability for any purpose of the Application.</span></p>
<h4><span style="font-style:italic;">Third Party Copyright Infringement</span></h4>
<p><span style="font-style:normal;">NYU does not condone the violation of copyright and other laws. NYU requires all users to Use the Application in strict compliance with copyright and other laws. NYU does not, by the supply of the Application, authorize or encourage you to infringe the copyright or other rights of third parties.</span></p>
<h4><span style="font-style:italic;">Indemnification</span></h4>
<p><span style="font-style:normal;">In connection with your user of Ad Observer and to the extent permitted by applicable law, you agree to defend, indemnify, and hold harmless NYU and its directors, officers, employees, and consultants, from and against any claim or demand (including reasonable attorney fees) arising from and of (a) your use of the Application; (b) any violation of these Terms of Use by you; (c ) any allegation that your use of the Application infringes or violates the copyright, trademark, trade secret or other intellectual property or rights of any third party.&nbsp;</span></p>
<h4><span style="font-style:italic;">Your Information</span></h4>
<p><span style="font-style:normal;">By installing the Application you acknowledge that you have reviewed and agree to the Ad Observer Privacy Policy that describes and governs the Application’s information gathering practices. A copy of Ad Observer’s Privacy Policy is available&nbsp;</span>
  <a href="https://adobserver.org/privacy-policy/" rel="noopener noreferrer" target="_blank"><span style="font-style:normal;">here</span></a><span style="font-style:normal;">. Ad Observer reserves the right to change the provisions of its Privacy Policy from time to time and if it does so, Ad Observer will post any changes to its Privacy Policy at the web address provided.</span></p>
<h4><span style="font-style:italic;">General Provisions</span></h4>
<p><span style="font-style:normal;">This is the entire agreement between you and NYU governing your use of Ad Observer, which supersedes any prior agreement or understanding, whether written, or oral, relating to the subject matter of these Terms of Use. If any part of these Terms of Use is found void and unenforceable, it will not affect the validity of the balance of the agreement, which shall remain valid and enforceable according to its terms. These Terms of Use shall automatically terminate upon failure by you to comply with its terms. NYU in its sole discretion, may modify these Terms of Use in writing at any time.</span></p>
<h4><span style="font-style:italic;">Termination</span></h4>
<p><span style="font-style:normal;">You may terminate these Terms of Use at any time by uninstalling Ad Observer. Your right to use Ad Observer may also be terminated by NYU at any time, without cause and without notice. This agreement will automatically terminate if you fail to comply with any of its terms. Upon termination, you agree to stop using and to uninstall Ad Observer.&nbsp;</span></p>
<h4><span style="font-style:italic;">Changes in these Terms of Use</span></h4>
<p><span style="font-style:normal;">NYU reserves the right to update these Terms of Use from time to time. Since your use of the Application is anonymous, we cannot inform you about this personally. The most current version of the Terms of Use can be reviewed </span>
  <a href="https://adobserver.org/terms-of-use/"><span style="font-style:normal;">here</span></a><span style="font-style:normal;">.</span></p>`,
  aboutText: `
  <p>
    ${title} is an initiative to empower citizens to
    voluntarily share data about what they see online to enable academic
    research and investigative journalism about how digital platforms impact
    society.
  </p>
  <p>
    The central tool for this project is a browser extension that collects
    content, advertisements, recommendations, and ad targeting information as
    users browse the web. This data is anonymized and transmitted to a central
    database where it can be analyzed. Aggregated data about what users see as
    well as the actual content and advertisements are accessible to
    researchers, journalists, and the public. This data can be used for
    non-commercial purposes to investigate how content spreads online, how
    users are targeted with advertisements, and what kinds of messages are
    used to persuade the public.
  </p>
  <p>
    This project is inspired by numerous efforts that have come before it,
    including the ProPublica Facebook Political Ad Collector (and the TGAM FB
    Political Ad Collector), Who Targets Me, Ad Analyst.
  </p>
  <p>
    The goal of this initiative is to make it easier to collect and share data
    across a range of digital platforms to bring greater transparency to the
    algorithms that impact our lives.
  </p>
  <p>
    This project is a collaboration between: The Algorithmic Transparency
    Institute, NYU, Quartz, and the University of Grenoble
  </p>
  <p>
    For more information about the project, please visit:&nbsp;
    <a href="https://adobserver.org">adobserver.org</a>.
  </p>`,
  privacyText: `
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">This Privacy Policy (“the Policy”) explains how and why New York University (“NYU”) processes personal data when people install Ad Observer (“the Application”).</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The Policy does not cover any other personal data processing by NYU, which is covered by other applicable policies and procedures, including&nbsp;</span>
  <a href="https://www.nyu.edu/footer/copyright-and-fair-use/digital-privacy-statement.html" style="text-decoration:none;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#0000ff;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">NYU’s Digital Privacy Statement</span></a><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">.&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">If you have a question regarding the Policy or the use of the Application, please contact&nbsp;</span>
  <a href="mailto:developers@adobserver.org" style="text-decoration:none;"><span style="font-size: 11pt; font-family: Calibri, sans-serif; color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap;">developers@adobserver.org</span></a><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">. &nbsp;&nbsp;</span><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
    <br>
    <br>
  </span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Data controller&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">NYU is the controller of the data covered by the Policy. You can contact NYU’s Data Protection Officer with any questions about this notice, our data collection practices, or your rights. You can reach NYU’s Data Protection Officer, Peter Christensen, at:</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Peter Christensen</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">c/o Data Protection Officer’s Office</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">70 Washington Square South</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Room 1201</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">New York, NY 10012</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">+1 212 992 7256</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Guiding principles</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">NYU is committed to respecting individuals’ right to privacy, protecting personal data and compliance with applicable laws globally. In accordance with these guiding principles, the Application has been designed to process the minimum amount of personal data possible to achieve NYU’s objectives.&nbsp;</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Purposes and means of data processing</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The purpose of the Application is to collect information about the political ads directed at and seen by private individuals on Facebook &amp; YouTube. This is done with the objective of facilitating public understanding of how political advertising is deployed. NYU believes that it is in the public interest to understand this phenomenon and its impact on democracy.&nbsp;</span><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
    <br>
  </span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">To this end, NYU collects basic demographic information about the individuals who install the Application as well as information about the ads that they see. This information has been kept to an absolute minimum, so that&nbsp;</span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">it is not possible for NYU to identify individual users of the Application</span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">. &nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">NYU also maintains a public, online repository of aggregate data (“the Database”) collected by the Application in order to render its research findings transparent and facilitate research by others. This information is anonymized so that&nbsp;</span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">it is not possible to identify individual users of the Application from within the Database</span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">. The Database can be accessed&nbsp;</span>
  <a href="https://adobserver.org/ad_database" rel="noopener noreferrer" target="_blank"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">here</span></a><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">.</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Data processed by the Application&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">When an individual user installs the Application, they are invited to provide basic demographic information about themselves: their age group, gender and ethnicity. This basic demographic profile (“the Profile”) helps NYU understand which people see which ads. It is not mandatory to provide this information and the Application can still collect data that contributes to the research project without creating a Profile.&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">No other personally identifiable information is requested or processed by NYU. The browser language, which is recorded by the Application for the purposes of correctly parsing the ads, is also included in the Profile. The Application does not undertake any “profiling” or “automated decision-making” as defined by the GDPR.&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">If the user has elected to share their Profile, an instance identification number (“ID”) is created and stored locally by the Application. When an ad is seen by the Application, details of the ad together with the ID and the Profile data is transmitted to NYU. This data is then added to the Database, with the exception of the ID, which is not added to the Database. &nbsp; &nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">If the user has decided not to create or share a Profile, only the data related to the ads is transmitted to and included in the Database. All users can view the data related to the ads that has been processed by the Application at any time by clicking on the Ad Observer icon and navigating to ‘My Archive’.&nbsp;</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Legal basis for processing</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">NYU processes data for the above purposes on the basis of consent. By installing the Application, users consent to the processing of their data for the purposes described above. Individuals may withdraw their consent at any time by uninstalling the Application.&nbsp;</span><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
    <br>
  </span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">As noted above, data retained in the Database is anonymized, meaning that a user’s withdrawal of consent will not mean the deletion of the data related to the ads that the Application has collected.&nbsp;</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">“Sensitive data”&nbsp;</span><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
    <br>
  </span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">As noted above, individuals may elect to provide information about their ethnicity when they install the Application. This data, which may fall within the definition of “special category data” under the GDPR, is processed with consent. As noted above,&nbsp;</span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">this data is not stored by NYU in a format that allows identification of the individual concerned</span><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">. No other sensitive data is requested or processed by NYU.&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Information security</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">NYU takes reasonable steps to protect personal data against loss, misuse, and unauthorized access, alteration, disclosure or destruction. This includes the use of technical, organizational and legal measures to ensure the confidentiality, integrity and availability of personal data.&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Information transmitted across the internet remains vulnerable to unauthorised access. The transmission of such data is therefore at the individual’s own risk. See further&nbsp;</span>
  <a href="https://adobserver.org/terms-of-use/" rel="noopener noreferrer" target="_blank"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">here</span></a><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">.</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Data retention&nbsp;</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">No personal data is retained by NYU. The only data that is retained has been fully and irreversibly anonymised. &nbsp;</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Data Subjects Rights</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Individuals whose personal data is processed in accordance with the GDPR have the following rights:</span></p>
	<ul><li>The right to be informed as to whether NYU holds data about them</li><li>The right of access to that information</li><li>The right to have inaccurate data corrected</li><li>The right to have their data deleted</li><li>The right to opt-out of particular data processing operations</li><li>The right to receive their data in a form that makes it “portable”</li><li>The right to object to data processing</li><li>The right to receive an explanation about any automated decision making and/or profiling, and to challenge those decisions where appropriate</li></ul>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Individuals wishing to exercise their rights in respect of the Application can do so by contacting NYU’s Data Protection Officer’s Office using the contact details provided above.&nbsp;</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Data subjects covered by EU law may also be entitled to lodge complaints in regard to data processing or the handling of subject access requests with data protection supervisory authority in their country of residence. Relevant supervisory authority names and contact details are listed&nbsp;</span>
  <a href="https://ec.europa.eu/newsroom/article29/item-detail.cfm?item_id=612080" style="text-decoration:none;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#0000ff;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">here</span></a><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#0000ff;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">.&nbsp;</span></p>
<p style="line-height: 1;">
  <br>
</p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Changes and revisions</span></p>
<p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size:11pt;font-family:Calibri,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Should NYU make changes to this Policy, the date and nature of the change will be indicated below.</span></p>`,
  apiUrl: 'https://observations.nyuapi.org',
  permissions: {
    SHOW_DEBUG_DATA: {
      label: 'Show Debug Data',
      hintText: 'Debugging information will be displayed',
      defaultValue: isDebug
    },
    USER_SHARE_LANGUAGE: {
      label: 'Share My Language',
      hintText: 'The language you told us you speak',
      defaultValue: true
    },
    USER_SHARE_COUNTRY: {
      label: 'Share My Country',
      hintText: 'The country you told us you are in',
      defaultValue: true
    },
    USER_SHARE_GENDER: {
      label: 'Share My Gender',
      hintText: 'The gender you told us you are',
      defaultValue: true
    },
    USER_SHARE_AGE: {
      label: 'Share My Age',
      hintText: 'The age group you told us you are in',
      defaultValue: true
    },
    USER_SHARE_DIAGNOSTICS: {
      label: 'Share Diagnostic Data',
      hintText: 'If things go wrong we’ll send extra data to help us diagnose the problem',
      defaultValue: true
    },
    FB_SHARE_SPONSORED_POSTS: {
      label: 'Share Facebook Ads',
      hintText: 'This allows the extension to collect all of the ads shown to you on Facebook',
      defaultValue: true
    },
    FB_SHARE_AD_TARGETING: {
      label: 'Share Ad Targeting Information',
      hintText:
        'This allows the extension to request and collect the "Why am I seeing this?" information from facebook that explains why a particular ad was targeted to you',
      defaultValue: true
    },
    FB_SHOW_COLLECTION_STATUS: {
      label: 'Show Collection Status',
      hintText: 'If on this will tag your facebook post with collection info.',
      defaultValue: isDebug // change this to `isDebug` if you want this only be on for debug users
    },
    YT_SHARE_WATCHED_VIDEOS: {
      label: 'Share Watched Videos',
      hintText:
        'This will share each video you choose to watch on YouTube (often, ads are targeted to be shown to viewers of a particular video or channel, so this is a big help if you opt-in)',
      defaultValue: false
    },
    YT_SHARE_RECOMMENDED_VIDEOS: {
      label: 'Share Recommendations',
      hintText:
        'This will share the other videos YouTube recommends to you while you are watching a video',
      defaultValue: false
    },
    YT_SHARE_ADS: {
      label: 'Share Advertisements',
      hintText: 'This will share all of the different types of ads you are shown on YouTube',
      defaultValue: true
    },
    YT_SHARE_AD_TARGETING: {
      label: 'Share Ad Targeting Information',
      hintText:
        'This will share the explanations provided by YouTube for why you were shown a particular ad',
      defaultValue: true
    }
  }
});
