import{s as r,j as e}from"./index-gRz1nVmc.js";const l=`
You have only <b>3 minutes</b> left to draw your <i>Cognitive-Affective Map</i> (CAM). Please begin to wrap up and keep the following in mind:
<ul style="font-size: 14px;">
  <li>Use no more than three words per concept and do not leave any drawn concept blank.</li>
  <li>Connect all the concepts you have drawn.</li>
</ul>
<br>
Please click on the background to continue.
`,c=`
Please finish drawing the <i>Cognitive-Affective Map</i> (CAM) now and consider the following:
<ul style="font-size: 14px;">
  <li>Do not leave any drawn concept blank.</li>
  <li>Connect all the concepts you have drawn.</li>
</ul>
<br>
Please click on the background to continue and click the disk icon in the top right corner to save your CAM.
`;function s(){var n=72e4,i=9e5;function t(){e("#dialogReminder").dialog("open"),e("#textDialogReminder")[0].innerHTML=l}function o(){e("#dialogReminder").dialog("open"),e("#textDialogReminder")[0].innerHTML=c}function a(){new Date().getTime(),setTimeout(t,n),setTimeout(o,i)}r.config.setReminder&&a()}export{s as initReminderDialogs};
