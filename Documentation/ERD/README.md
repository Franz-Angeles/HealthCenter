# PredictiMed ERD Documentation

This directory contains the Entity Relationship Diagrams (ERDs) for the PredictiMed Decision Support System, organized into logical modules for better maintainability and understanding.

## ERD Structure

The database design has been separated into 8 focused modules:

### 📋 01. Account Management (`01_account_management.mmd`)

-   **Account**: Core user authentication and authorization
-   **UserProfile**: Detailed user demographic information
-   **HealthWorker**: Healthcare provider profiles
-   **Purpose**: Foundation for all user interactions and role-based access

### 👨‍👩‍👧‍👦 02. Family Records (`02_family_records.mmd`)

-   **FamilyRecord**: Household information and contact details
-   **FamilyMember**: Individual family member data
-   **FamilyHealthHistory**: Genetic and chronic disease history
-   **Purpose**: Family-based health tracking and hereditary risk assessment

### 🤱 03. Maternal & Child Health (`03_maternal_child_health.mmd`)

-   **MaternalHealth**: Pregnancy and maternal care records
-   **PrenatalVisit**: Regular prenatal checkup data
-   **LaboratoryTest**: Medical tests and results
-   **Intervention**: Treatments and health interventions
-   **BirthInformation**: Delivery and newborn details
-   **Purpose**: Comprehensive maternal and child healthcare tracking

### 💉 04. Immunization & Health Monitoring (`04_immunization_health_monitoring.mmd`)

-   **ImmunizationEvent**: Vaccination visit records
-   **VaccineGiven**: Specific vaccines administered
-   **VitalSigns**: Basic health measurements
-   **AnthropometricMeasurement**: Physical measurements
-   **GrowthTracking**: Child development monitoring
-   **NCDRiskAssessment**: Non-communicable disease risk evaluation
-   **Purpose**: Preventive care and health status monitoring

### 🏥 05. Healthcare Services (`05_healthcare_services.mmd`)

-   **VisitRecord**: General healthcare visits
-   **HealthEducation**: Educational interventions
-   **NutritionalCounseling**: Dietary guidance
-   **Referral**: Healthcare facility referrals
-   **Appointment**: Scheduled healthcare visits
-   **ImmunizationReminder & TestReminder**: Automated follow-up systems
-   **VirtualCheckup & VirtualCheckupNote**: Telemedicine consultations
-   **Purpose**: Healthcare service delivery and care coordination

### 📅 06. Events & Programs (`06_events_programs.mmd`)

-   **Event**: Community health events and seminars
-   **EventRegistration**: Participant registration
-   **MedicalProgram**: Mass health programs (vaccination, screening)
-   **ProgramParticipation**: Program attendance tracking
-   **Purpose**: Community health engagement and mass health initiatives

### 💬 07. Communication & Surveys (`07_communication_surveys.mmd`)

-   **Inquiry & InquiryResponse**: User-admin communication
-   **Survey**: Data collection instruments
-   **SurveyQuestion**: Survey structure
-   **SurveyResponse & SurveyAnswer**: Survey data collection
-   **Purpose**: Community engagement and data collection

### 📊 08. Analytics & System Management (`08_analytics_system_management.mmd`)

-   **AnalyticsReport**: Health trend reports and insights
-   **PredictionModel**: AI/ML predictive models
-   **SystemLog**: Audit trail and activity tracking
-   **Purpose**: Decision support, trend analysis, and system monitoring

## Key Design Principles

### 🎯 Trend-Focused Architecture

-   All models designed for time-series analysis
-   Emphasis on population health trends over individual diagnostics
-   Support for predictive modeling and forecasting

### 🔒 Security & Audit Ready

-   Comprehensive audit logging for all medical records
-   Role-based access control through Account and HealthWorker entities
-   Privacy-conscious design with proper data separation

### 📈 Scalability & Performance

-   Optimized for large datasets and complex analytical queries
-   Modular design allows independent scaling of different domains
-   Efficient relationship modeling for fast data retrieval

### 🔄 Integration Ready

-   Clear external references between modules
-   Standardized FK relationships across all entities
-   API-friendly structure for web and mobile applications

## Usage Guidelines

1. **For Development**: Each module can be developed and tested independently
2. **For Documentation**: Present specific ERDs to stakeholders based on their domain interest
3. **For Database Design**: Use as foundation for Prisma schema or SQL table creation
4. **For System Architecture**: Reference for microservices or domain-driven design

## Cross-Module Relationships

Key entities that appear across multiple modules:

-   **Account**: Referenced in analytics, events, surveys, and system logs
-   **UserProfile**: Central to all patient-related modules
-   **HealthWorker**: Links account management to healthcare services

This modular approach ensures maintainability while preserving the comprehensive nature of the PredictiMed DSS system.
