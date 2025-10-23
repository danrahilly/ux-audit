import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import socialMediaPhone from "figma:asset/27bb99d92fd2014ab04754162682285f47300208.png";
import socialMedia3D from "figma:asset/39fe9b9d1d42d713a96f4061d8de02a0c59fabde.png";
import socialMediaCoffee from "figma:asset/93e7c65f816c4b6ba4a617f41140b73018919832.png";
import socialMediaApps from "figma:asset/ef6d4a937f772c106c48ea005d7b351518f11c14.png";
import peopleMobile from "figma:asset/b1b20d466bf7a778c8562b1d3b17302f97b4ef61.png";
import handSocialApps from "figma:asset/7e4b27a472d2b64f0f0567b0d86a63ec85a4d271.png";
import socialLikeIcon from "figma:asset/75ce4d59bc99e7844703371d4bc3c25767967114.png";
import facebookLaptop from "figma:asset/339cac7ca04562a56f19a6cae04eb632b2f87e65.png";
import instagramUrban from "figma:asset/cd92d0047223acb838b42d10a1f94046bba5331f.png";

interface ImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string, alt: string) => void;
}

// Media gallery images
const MEDIA_GALLERY_IMAGES = [
  { id: 1, url: socialMediaPhone, alt: "Social media apps on phone screen" },
  { id: 2, url: socialMedia3D, alt: "3D social media icons" },
  { id: 3, url: socialMediaCoffee, alt: "Phone with social apps and coffee" },
  { id: 4, url: socialMediaApps, alt: "Collection of social media app icons" },
  { id: 5, url: peopleMobile, alt: "People using mobile phones" },
  { id: 6, url: handSocialApps, alt: "Hand holding phone with social media apps" },
  { id: 7, url: socialLikeIcon, alt: "Social media like notification with phone" },
  { id: 8, url: facebookLaptop, alt: "Facebook on phone next to laptop" },
  { id: 9, url: instagramUrban, alt: "Instagram profile in urban setting" },
];

export function ImagePicker({ isOpen, onClose, onSelectImage }: ImagePickerProps) {
  const handleImageSelect = (url: string, alt: string) => {
    onSelectImage(url, alt);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Media Gallery</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select an image from your media gallery to add to your page.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4">
          <div className="grid grid-cols-3 gap-4 pb-2">
            {MEDIA_GALLERY_IMAGES.map((image) => (
              <button
                key={image.id}
                onClick={() => handleImageSelect(image.url, image.alt)}
                className="relative aspect-[4/3] rounded-[var(--radius)] overflow-hidden border border-border hover:border-primary transition-colors group"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
