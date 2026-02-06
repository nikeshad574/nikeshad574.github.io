const conf = {
  appwrite: {
    endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collections: {
      experience: String(import.meta.env.VITE_APPWRITE_EXPERIENCE_COLLECTION),
      aboutMe: String(import.meta.env.VITE_APPWRITE_ABOUTME_COLLECTION),
      contact: String(import.meta.env.VITE_APPWRITE_CONTACT_COLLECTION),
      skills: String(import.meta.env.VITE_APPWRITE_SKILL_COLLECTION),
      projects: String(import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION),
    },
  },
  emailJs: {
    serviceId: String(import.meta.env.VITE_EMAILJS_SERVICE_ID),
    templateId: String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
    publicKey: String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
  },
};

export default conf;
