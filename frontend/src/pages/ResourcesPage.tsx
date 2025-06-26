import React from 'react';

const ResourcesPage: React.FC = () => {
  return (
    <section id="resources" className="content-section active">
      <div className="section-header">
        <h1>Ressources Congo</h1>
        <p>Informations essentielles pour votre installation</p>
      </div>

      <div className="resources-grid">
        {/* Contexte économique */}
        <div className="card economic-context-card">
          <h3>📊 Contexte Économique</h3>
          <div className="economic-indicators">
            <div className="indicator">
              <span className="indicator-label">PIB 2025</span>
              <span className="indicator-value">+4.4%</span>
            </div>
            <div className="indicator">
              <span className="indicator-label">Pétrole</span>
              <span className="indicator-value">85$/baril</span>
            </div>
            <div className="indicator">
              <span className="indicator-label">Inflation</span>
              <span className="indicator-value">2.8%</span>
            </div>
            <div className="indicator">
              <span className="indicator-label">Taux change</span>
              <span className="indicator-value">Stable</span>
            </div>
          </div>
        </div>

        {/* Contacts utiles */}
        <div className="card contacts-card">
          <h3>📞 Contacts Utiles</h3>
          <div className="contacts-list">
            <div className="contact-item">
              <h4>🤖 CARIA</h4>
              <p>Centre Africain Recherche IA - Brazzaville</p>
              <span className="contact-type">Partenariat technologique</span>
            </div>
            <div className="contact-item">
              <h4>🏢 TotalEnergies</h4>
              <p>Startup Center - Incubateur</p>
              <span className="contact-type">Incubation et financement</span>
            </div>
            <div className="contact-item">
              <h4>💰 FIGA</h4>
              <p>Financement PME</p>
              <span className="contact-type">Financement entreprises</span>
            </div>
            <div className="contact-item">
              <h4>💻 ACSI</h4>
              <p>Agence Congolaise Systèmes Information</p>
              <span className="contact-type">Partenariat SI</span>
            </div>
          </div>
        </div>

        {/* Checklist administrative */}
        <div className="card admin-checklist-card">
          <h3>📋 Checklist Administrative</h3>
          <div className="checklist">
            <label className="checklist-item">
              <input type="checkbox" /> Visa d'entrée et de séjour
            </label>
            <label className="checklist-item">
              <input type="checkbox" /> Déclaration d'investissement
            </label>
            <label className="checklist-item">
              <input type="checkbox" /> Enregistrement entreprise CFCE
            </label>
            <label className="checklist-item">
              <input type="checkbox" /> Permis d'exploitation drone
            </label>
            <label className="checklist-item">
              <input type="checkbox" /> Licence conseil en systèmes
            </label>
            <label className="checklist-item">
              <input type="checkbox" /> Compte bancaire professionnel
            </label>
            <label className="checklist-item">
              <input type="checkbox" /> Assurance responsabilité civile
            </label>
            <label className="checklist-item">
              <input type="checkbox" /> Domiciliation bureau
            </label>
          </div>
        </div>

        {/* Guide culturel */}
        <div className="card cultural-guide-card">
          <h3>🌍 Guide Culturel</h3>
          <div className="cultural-tips">
            <div className="tip-category">
              <h4>✅ Do's (À faire)</h4>
              <ul>
                <li>Privilégier les relations avant les transactions</li>
                <li>Faire preuve de patience dans les décisions</li>
                <li>Respecter la hiérarchie établie</li>
                <li>Accorder du temps aux échanges sociaux</li>
                <li>Adapter votre communication (indirecte)</li>
              </ul>
            </div>
            <div className="tip-category">
              <h4>❌ Don'ts (À éviter)</h4>
              <ul>
                <li>Précipiter les négociations</li>
                <li>Ignorer les codes sociaux</li>
                <li>Négliger l'aspect relationnel</li>
                <li>Être trop direct dans la critique</li>
                <li>Minimiser l'importance du protocole</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPage; 