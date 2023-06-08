type Mapping = Record<string, { tags: string[], name: string }>

const tagMappings: Mapping = {
    "4703": {
        "tags": [
            "Woodlands & Tuas Checkpoint"
        ],
        "name": "Second Link at Tuas"
    },
    "4713": {
        "tags": [
            "Woodlands & Tuas Checkpoint"
        ],
        "name": "Tuas Checkpoint"
    },
    "2701": {
        "tags": [
            "Woodlands & Tuas Checkpoint"
        ],
        "name": "Woodlands Causeway (to Johor)"
    },
    "2702": {
        "tags": [
            "Woodlands & Tuas Checkpoint",
            "BKE"
        ],
        "name": "Woodlands Causeway (to BKE)"
    },
    "9701": {
        "tags": [
            "SLE"
        ],
        "name": "Lentor Flyover"
    },
    "9706": {
        "tags": [
            "SLE"
        ],
        "name": "Mandai Flyover"
    },
    "9705": {
        "tags": [
            "SLE"
        ],
        "name": "Marsiling Flyover"
    },
    "9703": {
        "tags": [
            "SLE",
            "BKE"
        ],
        "name": "SLE(BKE) Exit"
    },
    "9704": {
        "tags": [
            "SLE"
        ],
        "name": "Ulu Sembawang Flyover"
    },
    "9702": {
        "tags": [
            "SLE"
        ],
        "name": "Upp Thomson Flyover"
    },
    "7795": {
        "tags": [
            "TPE"
        ],
        "name": "Tampines Flyover"
    },
    "7796": {
        "tags": [
            "TPE"
        ],
        "name": "Punggol Flyover"
    },
    "7798": {
        "tags": [
            "TPE"
        ],
        "name": "Seletar Flyover"
    },
    "7797": {
        "tags": [
            "TPE"
        ],
        "name": "Seletar West Link"
    },
    "7793": {
        "tags": [
            "TPE"
        ],
        "name": "Tampines Ave 10"
    },
    "7794": {
        "tags": [
            "TPE",
            "KPE"
        ],
        "name": "TPE(KPE) Exit"
    },
    "7791": {
        "tags": [
            "TPE"
        ],
        "name": "Upp Changi Flyover"
    }
}


type SlugTagMap = Record<string, string>

const slugToTag: SlugTagMap = {
    "SLE": "SLE"
}

export { tagMappings, slugToTag }