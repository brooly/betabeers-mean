var mongoose = require('mongoose'),
  Schema = mongoose.Schema;     //Para modelar el esquema

var busstopSchema = new Schema({
  title:    { type: String, required: true },
  subtitle: { type: String },
  name:     { type: String },
  lon:      { type: Number },
  lat:      { type: Number },
  pole:     { type: Number },
  lines:    [{type: String}],
  suspended:  { type: Boolean, 
               default: false
              },
  created:    { type: Date, 
               default: Date.now
              },
  typeStop:   { type: String, 
               required:true,
               enum: ['Bus', 'Tranvia', 'Bizi'],
               default: 'Bus'
              }
});

// Campos virtuales. No se persisten en mongo
busstopSchema.virtual('fullTitle').get(function() {
  return this.title + ' ' + this.subtitle;
});

// userSchema.virtual('password').set(function(password) {
//     this._password = password;
//     this.salt = common.makeSalt();
//     this.hashed_password = common.encryptPassword(password);
// }).get(function() {
//     return this._password;
// });

//Validaciones
busstopSchema.path('subtitle').validate(function(subtitle) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (this.typeStop==='Bus') return true;
  return subtitle!==undefined && subtitle.length > 0;
}, 'Subtitle cannot be blank');


/**
 * Methods
 */
busstopSchema.methods = {
    /**
     * Filtered - return no internal data
     *
     * @return {Object}
     * @api public
     */
    filtered: function() {
      return {
        busstop : {
          id: this._id,
          title: this.title,
          typeStop: this.typeStop,
          pole: this.pole
        }
      };
    },

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    // authenticate: function(plainText) {
    //     return common.encryptPassword(plainText) === this.hashed_password;
    // }

};

mongoose.model('BusStop', busstopSchema);