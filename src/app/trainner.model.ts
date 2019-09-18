export class Trainner {
    _id : String;
    personal_details: { type: Object,
        name: { type: Object,
            first_name: String,
            last_name: String
        },
        dob: String,
        about_yourself: String,
        languages_known: [String],
        willingly_to_travel: String
    };
    technologies: [ Object, {
        type: Object,
            name: String,
            experience: Number,
            ratings: Number,
            costing: { type: Object,
                freshers: Number,
                laterals: Number,
                project_specific: Number
            },
            work_as_consultant: String
    }];
    certifications: [Object, {
        title: String,
        Year: Number
    }]
}
