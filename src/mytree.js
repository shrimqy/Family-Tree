import React, { Component } from 'react';
import FamilyTree from "./familytree.js";  

FamilyTree.templates.sriniz = Object.assign({}, FamilyTree.templates.base);

FamilyTree.templates.sriniz.size = [225, 90];
FamilyTree.templates.sriniz.node =
    '<rect x="0" y="0" height="90" width="225" stroke-width="1" rx="15" ry="15"></rect>';



// Male
FamilyTree.templates.sriniz_male = Object.assign({}, FamilyTree.templates.sriniz);
FamilyTree.templates.sriniz_male.node =
    '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="15" ry="15"></rect>';

FamilyTree.templates.sriniz_male.field_0 =
    '<text data-width="100" data-text-overflow="multiline" style="font-size: 16px; font-weight: bold;" fill="#fff" x="100" y="30" text-anchor="start">{val}</text>';
FamilyTree.templates.sriniz_male.field_1 =
    '<text data-text-overflow="ellipsis" style="font-size: 12px; font-weight: bold;" fill="#ffffff" x="100" y="50">{val}</text>';

// Female
FamilyTree.templates.sriniz_female = Object.assign({}, FamilyTree.templates.sriniz);
FamilyTree.templates.sriniz_female.node =
    '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#FF46A3" stroke="#aeaeae" rx="15" ry="15"></rect>';

FamilyTree.templates.sriniz_female.field_0 =
    '<text data-width="100" data-text-overflow="multiline" style="font-size: 16px; font-weight: bold;" fill="#fff" x="100" y="30" text-anchor="start">{val}</text>';
FamilyTree.templates.sriniz_female.field_1 =
    '<text style="font-size: 12px; font-weight: bold;" fill="#ffffff" x="100" y="50">{val}</text>';

const expandIconMale =
    '<circle cx="97" cy="-16" r="10" fill="#039BE5" stroke="#fff" stroke-width="1"><title>Expand</title></circle>' +
    '<line x1="90" y1="-16" x2="104" y2="-16" stroke-width="1" stroke="#fff"></line>' +
    '<line x1="97" y1="-23" x2="97" y2="-9" stroke-width="1" stroke="#fff"></line>';

const expandIconFemale =
    '<circle cx="97" cy="-16" r="10" fill="#FF46A3" stroke="#fff" stroke-width="1"></circle>' +
    '<line x1="90" y1="-16" x2="104" y2="-16" stroke-width="1" stroke="#fff"></line>' +
    '<line x1="97" y1="-23" x2="97" y2="-9" stroke-width="1" stroke="#fff"></line>';

FamilyTree.templates.sriniz_male.plus = expandIconMale;
FamilyTree.templates.sriniz_female.plus = expandIconFemale;

// Image
const imgTemplate =
    '<clipPath id="ulaImg">' +
    '<rect height="75" width="75" x="7" y="7" stroke-width="1" fill="#FF46A3" stroke="#aeaeae" rx="15" ry="15"></rect>' +
    '</clipPath>' +
    '<image x="7" y="7" preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" width="75" height="75">' +
    '</image>';

FamilyTree.templates.sriniz_male.img_0 = imgTemplate;
FamilyTree.templates.sriniz_female.img_0 = imgTemplate;

FamilyTree.templates.sriniz_male.up =
    '<use x="195" y="0" xlink:href="#sriniz_male_up"></use>';
FamilyTree.templates.sriniz_female.up =
    '<use x="195" y="0" xlink:href="#sriniz_female_up"></use>';

// Pointer
FamilyTree.templates.sriniz.pointer =
    '<g data-pointer="pointer" transform="matrix(0,0,0,0,80,80)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">' +
    '<polygon fill="#039BE5" points="53.004,173.004 53.004,66.996 0,120" />' +
    '<polygon fill="#039BE5" points="186.996,66.996 186.996,173.004 240,120" />' +
    '<polygon fill="#FF46A3" points="66.996,53.004 173.004,53.004 120,0" />' +
    '<polygon fill="#FF46A3" points="120,240 173.004,186.996 66.996,186.996" />' +
    '<circle fill="red" cx="120" cy="120" r="30" />' +
    '</g></g>';
//linewidth

FamilyTree.templates.sriniz_male.link = '<path stroke-linejoin="round" stroke="#FFFFED" stroke-width="3px" fill="none" d="{rounded}" />'

FamilyTree.templates.sriniz_female.link = '<path stroke-linejoin="round" stroke="#FFFFED" stroke-width="3px" fill="none" d="{rounded}" />'



FamilyTree.SEARCH_PLACEHOLDER = "Search Name,FamilyID"




export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.family = new FamilyTree(this.divRef.current, {
            nodes: this.props.nodes,
            
            searchFields: ["name", "familyId"],
            
            orientation: FamilyTree.orientation.top,
            nodeBinding: {
                field_0: 'name',
                img_0: 'img'
            },
            nodeMouseClick: FamilyTree.action.details,
            editForm: {
                readOnly: true,
                buttons:  {
                    pdf: null,
                    share: null
                },
                generateElementsFromFields: false,
                elements: [
                    { type: 'textbox', label: 'Full Name', binding: 'name' },
                    { type: 'textbox', label: 'Nick Name', binding: 'nickName' },
                    { type: 'textbox', label: 'Family ID', binding: 'familyId' },
                    { type: 'textbox', label: 'Birth Date', binding: 'birthDate' }, 
                    { type: 'textbox', label: 'Death Date', binding: 'deathDate' }, 
                    { type: 'textbox', label: 'Anniversary Date', binding: 'anniversaryDate' },
                    { type: 'textbox', label: 'Address', binding: 'address' },
                    { type: 'textbox', label: 'Email', binding: 'email' },
                    { type: 'textbox', label: 'Mobile No', binding: 'mobileNo' },
                    { type: 'textbox', label: 'Whatsapp No', binding: 'whatsappNumber' },
                    { type: 'textbox', label: 'Profession', binding: 'profession' },
                    { type: 'textbox', label: 'More Infos', binding: 'achievements' },
                ]
            },
            mode: "dark",
            template: "sriniz",
            scaleInitial: FamilyTree.match.boundary,
            scaleMax: 1.5,
        });
    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}
