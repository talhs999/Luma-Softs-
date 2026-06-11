export function generateEmailHTML(title, content) {
  return `
    <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background-color: #050505; padding: 40px 20px; text-align: center;">
        <!-- Assuming the logo will be available here when deployed -->
        <img src="https://lumasofts.com/logo.png" alt="Luma Softs" style="height: 60px; margin-bottom: 15px; object-fit: contain;" onerror="this.style.display='none'" />
        <h1 style="color: #c2ff05; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">${title}</h1>
      </div>

      <!-- Body -->
      <div style="padding: 40px 30px; color: #202124; line-height: 1.7; font-size: 16px;">
        ${content}
      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eaeaea; font-size: 14px; color: #5f6368;">
        <p style="margin: 0 0 10px 0; font-weight: 600; color: #050505;">Luma Softs - Powering Ideas Into Innovation</p>
        <p style="margin: 0 0 15px 0;">
          <a href="https://lumasofts.com" style="color: #050505; text-decoration: underline;">Website</a> &nbsp;|&nbsp; 
          <a href="mailto:info@lumasofts.com" style="color: #050505; text-decoration: underline;">Contact Support</a>
        </p>
        <p style="margin: 0; font-size: 12px; color: #9aa0a6;">© ${new Date().getFullYear()} Luma Softs. All rights reserved.</p>
      </div>

    </div>
  `;
}
