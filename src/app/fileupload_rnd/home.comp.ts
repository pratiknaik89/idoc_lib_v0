
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
    selector: 'app-home',
    templateUrl: './home.comp.html',
    styleUrls: ['./home.comp.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FileFolderComponent implements OnInit, AfterViewInit {
    constructor(public sanitizer: DomSanitizer) {

    }
    @ViewChild('advt', { static: false }) advancedFileInput: ElementRef;
    files = [];
    ngOnInit(): void {


    }


    choose() {
        this.advancedFileInput.nativeElement.click();
    }

    onFolderSelected(event) {
        let selfiles = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (var i = 0; i < selfiles.length; ++i) {
            if (!(selfiles[i].webkitRelativePath.split('/').length > 2)) {
                let file = selfiles[i]
                // Do whatever you want
                //file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
                this.files.push(file)

            }
        }

    }

    ngAfterViewInit(): void {

        // console.log(this.advancedFileInput)
    }
}
