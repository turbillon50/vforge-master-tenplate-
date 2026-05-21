import type { IndustryTemplate } from "@/config/industry.config";

export const schoolTemplate: IndustryTemplate = {
  id: "school",
  name: { en: "School", es: "Escuela" },
  tagline: {
    en: "Students, parents, teachers, attendance and communication.",
    es: "Alumnos, padres, profesores, asistencia y comunicación.",
  },
  description: {
    en: "Group-driven school management: students, parents, teachers, groups, attendance, announcements, assignments, calendar, payments and parent-teacher communication.",
    es: "Gestión escolar por grupos: alumnos, padres, profesores, grupos, asistencia, anuncios, tareas, calendario, pagos y comunicación padres-profesores.",
  },
  icon: "GraduationCap",
  recommendedArchetype: "productivity",
  modules: [
    "communication",
    "notifications",
    "user-operations",
    "payments",
    "analytics",
    "dynamic-content",
    "booking",
  ],
  roles: [
    {
      key: "school_admin",
      label: { en: "School admin", es: "Admin escolar" },
      description: { en: "Manages the whole school.", es: "Gestiona toda la escuela." },
    },
    {
      key: "director",
      label: { en: "Director", es: "Director" },
      description: { en: "Academic leadership.", es: "Liderazgo académico." },
    },
    {
      key: "teacher",
      label: { en: "Teacher", es: "Profesor" },
      description: { en: "Owns groups, attendance, assignments.", es: "Dueño de grupos, asistencia, tareas." },
    },
    {
      key: "parent",
      label: { en: "Parent", es: "Padre / Madre" },
      description: { en: "Receives announcements, pays, communicates with teachers.", es: "Recibe anuncios, paga, se comunica con profesores." },
    },
    {
      key: "student",
      label: { en: "Student", es: "Alumno" },
      description: { en: "Receives assignments and calendar.", es: "Recibe tareas y calendario." },
    },
    {
      key: "cashier",
      label: { en: "Cashier", es: "Caja" },
      description: { en: "Handles payments at the front office.", es: "Gestiona pagos en oficina." },
    },
  ],
  dashboardSections: [
    { key: "calendar", label: { en: "Calendar", es: "Calendario" }, href: "/app/booking", icon: "CalendarCheck" },
    { key: "announcements", label: { en: "Announcements", es: "Anuncios" }, href: "/app/inbox", icon: "Megaphone" },
    { key: "payments", label: { en: "Payments", es: "Pagos" }, href: "/app/payments", icon: "CreditCard" },
    { key: "profile", label: { en: "Profile", es: "Perfil" }, href: "/app/profile", icon: "UserCog" },
  ],
  adminSections: [
    { key: "groups", label: { en: "Groups", es: "Grupos" }, href: "/admin/content", icon: "Users" },
    { key: "students", label: { en: "Students", es: "Alumnos" }, href: "/admin/users", icon: "GraduationCap" },
    { key: "parents", label: { en: "Parents", es: "Padres" }, href: "/admin/users", icon: "Users" },
    { key: "announcements", label: { en: "Communication", es: "Comunicación" }, href: "/admin/communication", icon: "MessagesSquare" },
    { key: "payments", label: { en: "Tuition / fees", es: "Colegiaturas" }, href: "/admin/payments", icon: "CreditCard" },
  ],
  dataModels: [
    {
      name: "Group",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "name", type: "string", required: true },
        { name: "grade", type: "string" },
        { name: "academicYear", type: "string", required: true },
        { name: "teacherId", type: "uuid" },
      ],
    },
    {
      name: "Student",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "firstName", type: "string", required: true },
        { name: "lastName", type: "string", required: true },
        { name: "groupId", type: "uuid" },
        { name: "parentIds", type: "uuid[]" },
        { name: "status", type: "enum:active|inactive|graduated" },
      ],
    },
    {
      name: "Attendance",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "studentId", type: "uuid", required: true },
        { name: "date", type: "date", required: true },
        { name: "status", type: "enum:present|absent|late|excused", required: true },
        { name: "markedBy", type: "uuid" },
      ],
    },
    {
      name: "Announcement",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "audience", type: "enum:all|group|parents|teachers|students", required: true },
        { name: "title", type: "string", required: true },
        { name: "body", type: "text", required: true },
        { name: "sendAt", type: "timestamp" },
      ],
    },
  ],
  communicationFlows: [
    {
      id: "daily-announcement",
      label: { en: "Daily announcement", es: "Anuncio diario" },
      steps: ["admin.compose", "broadcast.send_all"],
    },
    {
      id: "parent-teacher-chat",
      label: { en: "Parent-teacher chat", es: "Chat padre-profesor" },
      steps: ["parent.opens_chat", "teacher.responds"],
    },
    {
      id: "emergency-notice",
      label: { en: "Emergency notice", es: "Aviso de emergencia" },
      steps: ["admin.compose_urgent", "broadcast.push_sms_email_all"],
    },
  ],
  paymentFlows: [
    {
      id: "tuition",
      label: { en: "Tuition / monthly fee", es: "Colegiatura mensual" },
      steps: ["statement.issued", "parent.pays", "receipt.email"],
    },
  ],
  notificationFlows: [
    {
      id: "attendance-alert",
      label: { en: "Attendance alert", es: "Alerta de asistencia" },
      steps: ["attendance.marked_absent", "parent.notified"],
    },
    {
      id: "assignment-due",
      label: { en: "Assignment due", es: "Tarea por vencer" },
      steps: ["assignment.deadline_24h", "student.push_notification"],
    },
  ],
  requiredIntegrations: ["clerk", "neon"],
  optionalIntegrations: ["stripe", "mercadopago", "twilio", "resend"],
};
